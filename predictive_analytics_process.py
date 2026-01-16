import pandas as pd
from datetime import datetime, timedelta
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import warnings

# Suppress specific sklearn warnings
warnings.filterwarnings("ignore", category=UserWarning, module='sklearn')

def load_event_log(file_path):
    """
    Loads an event log from a CSV file.
    Assumes CSV has 'case_id', 'activity', 'timestamp' columns.
    Timestamp column is converted to datetime objects.
    """
    try:
        df = pd.read_csv(file_path)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df = df.sort_values(by=['case_id', 'timestamp'])
        return df
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return None
    except KeyError as e:
        print(f"Error: Missing expected column in CSV: {e}. Required: 'case_id', 'activity', 'timestamp'")
        return None

def feature_engineer_process_data(event_log):
    """
    Engineers features from event log data for predictive modeling.
    Calculates features like:
    - total_activities_in_case
    - time_since_start
    - current_activity_duration (simplified as time between current and previous, or 0 for first)
    - one-hot encoding for activity
    - target: remaining_cycle_time
    """
    features = []
    for case_id, group in event_log.groupby('case_id'):
        group = group.sort_values(by='timestamp').reset_index(drop=True)
        start_time = group['timestamp'].min()
        end_time = group['timestamp'].max()
        full_cycle_time = (end_time - start_time).total_seconds() if pd.notna(start_time) and pd.notna(end_time) else 0

        for i in range(len(group)):
            current_time = group.loc[i, 'timestamp']
            activity = group.loc[i, 'activity']
            
            # Features for the current state
            time_since_start = (current_time - start_time).total_seconds()
            activities_completed = i + 1
            
            # Simplified activity duration
            current_activity_duration = 0
            if i > 0:
                current_activity_duration = (current_time - group.loc[i-1, 'timestamp']).total_seconds()

            # Target: Remaining cycle time
            remaining_cycle_time = full_cycle_time - time_since_start
            if remaining_cycle_time < 0: remaining_cycle_time = 0 # Handle cases where current_time > end_time due to max calculation

            features.append({
                'case_id': case_id,
                'activity': activity,
                'timestamp': current_time,
                'activities_completed': activities_completed,
                'time_since_start': time_since_start,
                'current_activity_duration': current_activity_duration,
                'remaining_cycle_time': remaining_cycle_time,
                'full_cycle_time': full_cycle_time
            })
    
    features_df = pd.DataFrame(features)
    
    # One-hot encode the 'activity' column
    features_df = pd.get_dummies(features_df, columns=['activity'], prefix='activity')
    
    return features_df

def train_predictive_model(features_df):
    """
    Trains a RandomForestRegressor model to predict remaining_cycle_time.
    """
    if features_df.empty:
        print("No features to train the model.")
        return None, None, None

    # Exclude non-feature columns and target
    X = features_df.drop(columns=['case_id', 'timestamp', 'remaining_cycle_time', 'full_cycle_time'])
    y = features_df['remaining_cycle_time']

    # Align columns in case new activities appear in test set
    # This step is crucial if you're predicting on new data with potentially new activities.
    # For now, assuming training and prediction data have same activities.

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"\nModel Training Results:")
    print(f"  Mean Absolute Error (MAE): {mae:.2f} seconds")
    print(f"  R-squared (R2) Score: {r2:.2f}")

    return model, X, X_test

def predict_and_alert(model, current_process_state_df, sla_threshold_seconds=timedelta(hours=1).total_seconds()):
    """
    Predicts remaining cycle time for current process states and generates alerts.
    """
    if model is None or current_process_state_df.empty:
        print("Cannot predict: model not trained or no current process data.")
        return []

    # Ensure current_process_state_df has the same columns as the training data, fill missing activity columns with 0
    # For a robust solution, you'd save the columns from training and use them here.
    # For this example, we assume `current_process_state_df` is created similarly to `features_df`
    # and we need to align the columns for prediction.
    
    # Identify all possible activity columns from original training
    training_activity_cols = [col for col in model.feature_names_in_ if col.startswith('activity_')]
    
    # Add any missing activity columns to current_process_state_df and fill with 0
    for col in training_activity_cols:
        if col not in current_process_state_df.columns:
            current_process_state_df[col] = 0

    # Ensure columns order matches the training data
    current_process_state_aligned = current_process_state_df[model.feature_names_in_]
    
    predictions = model.predict(current_process_state_aligned)
    
    alerts = []
    for i, pred_rem_time in enumerate(predictions):
        case_id = current_process_state_df.iloc[i]['case_id']
        current_activity = current_process_state_df.iloc[i].filter(like='activity_').idxmax()
        
        # This is a simplified way to get current activity name (gets the column name of the max value)
        current_activity_name = current_activity.replace('activity_', '')

        total_predicted_time = current_process_state_df.iloc[i]['time_since_start'] + pred_rem_time
        
        if total_predicted_time > sla_threshold_seconds:
            alerts.append(f"ALERT: Case {case_id} ({current_activity_name}) is predicted to exceed SLA. "
                          f"Predicted total time: {timedelta(seconds=total_predicted_time)}. "
                          f"Remaining: {timedelta(seconds=pred_rem_time)}")
        else:
            alerts.append(f"Prediction: Case {case_id} ({current_activity_name}) will complete within "
                          f"approx. {timedelta(seconds=total_predicted_time)}. Remaining: {timedelta(seconds=pred_rem_time)}")
    return alerts

def run_predictive_analytics(file_path):
    """
    Main function to run predictive analytics on process data.
    """
    event_log = load_event_log(file_path)
    if event_log is None or event_log.empty:
        print("No event log data to process for predictive analytics.")
        return

    print(f"\n--- Predictive Analytics Report for: {file_path} ---")

    # 1. Feature Engineering
    features_df = feature_engineer_process_data(event_log)
    print(f"\n1. Features Engineered for {features_df['case_id'].nunique()} cases and {len(features_df)} events.")
    # print(features_df.head()) # Uncomment to see engineered features

    # 2. Model Training
    model, _, X_test_df = train_predictive_model(features_df)
    if model is None:
        return

    # 3. Prediction and Alerting for a few sample in-progress cases
    print("\n3. Predicting and Alerting for Sample Cases:")
    # For demonstration, we use some test data points. In a real scenario, this would be live data.
    sample_current_states = X_test_df.sample(min(5, len(X_test_df)), random_state=42).copy() # Get 5 random samples
    
    # We need to add the 'case_id', 'timestamp', 'time_since_start' back to the sample for reporting
    sample_indices = sample_current_states.index
    original_sample_data = features_df.loc[sample_indices, ['case_id', 'timestamp', 'time_since_start']].copy()
    
    # Merge activity columns from sample_current_states back into original_sample_data
    # This is a bit of a hack for the demo; in production, you'd prepare current state data properly.
    for col in sample_current_states.columns:
        if col.startswith('activity_'):
            original_sample_data[col] = sample_current_states[col]

    alerts = predict_and_alert(model, original_sample_data, sla_threshold_seconds=timedelta(minutes=60).total_seconds()) # 60 minute SLA
    for alert in alerts:
        print(f"  - {alert}")

    print("\n--- End of Predictive Report ---")

if __name__ == "__main__":
    # Ensure a dummy event log CSV exists for demonstration
    dummy_file_path = 'sample_event_log.csv'
    try:
        pd.read_csv(dummy_file_path) # Try reading it
    except (FileNotFoundError, KeyError):
        # If not found or broken, recreate it
        dummy_data = {
            'case_id': [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4],
            'activity': [
                'Start Order', 'Process Payment', 'Pick Items', 'Ship Order',
                'Start Order', 'Pick Items', 'Ship Order',
                'Start Order', 'Process Payment', 'Pick Items', 'Deliver',
                'Start Order', 'Pick Items', 'Deliver'
            ],
            'timestamp': [
                '2023-01-01 08:00:00', '2023-01-01 08:15:00', '2023-01-01 08:45:00', '2023-01-01 09:30:00',
                '2023-01-02 10:00:00', '2023-01-02 10:40:00', '2023-01-02 11:10:00',
                '2023-01-03 13:00:00', '2023-01-03 13:20:00', '2023-01-03 14:00:00', '2023-01-03 15:00:00',
                '2023-01-04 09:00:00', '2023-01-04 09:40:00', '2023-01-04 10:30:00'
            ]
        }
        dummy_df = pd.DataFrame(dummy_data)
        dummy_df.to_csv(dummy_file_path, index=False)
        print(f"Generated dummy event log at {dummy_file_path}")

    # Run the predictive analytics engine
    run_predictive_analytics(dummy_file_path)