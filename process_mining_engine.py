import pandas as pd
from datetime import datetime, timedelta

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

def discover_process_flow(event_log):
    """
    Discovers a simplified process flow by sequencing activities for each case.
    Returns a dictionary where keys are sequences and values are their counts.
    """
    process_flows = {}
    for case_id, group in event_log.groupby('case_id'):
        flow = tuple(group['activity'].tolist())
        process_flows[flow] = process_flows.get(flow, 0) + 1
    return process_flows

def calculate_kpis(event_log):
    """
    Calculates key performance indicators (KPIs) like cycle time and throughput.
    """
    kpis = {}

    # Cycle Time
    cycle_times = []
    for case_id, group in event_log.groupby('case_id'):
        start_time = group['timestamp'].min()
        end_time = group['timestamp'].max()
        if pd.notna(start_time) and pd.notna(end_time):
            cycle_times.append((end_time - start_time).total_seconds())

    if cycle_times:
        kpis['average_cycle_time'] = timedelta(seconds=sum(cycle_times) / len(cycle_times))
        kpis['min_cycle_time'] = timedelta(seconds=min(cycle_times))
        kpis['max_cycle_time'] = timedelta(seconds=max(cycle_times))
    else:
        kpis['average_cycle_time'] = 'N/A'
        kpis['min_cycle_time'] = 'N/A'
        kpis['max_cycle_time'] = 'N/A'

    # Throughput (simple: cases completed per day)
    num_cases = event_log['case_id'].nunique()
    if not event_log.empty:
        process_duration_days = (event_log['timestamp'].max() - event_log['timestamp'].min()).days
        if process_duration_days > 0:
            kpis['throughput_cases_per_day'] = num_cases / process_duration_days
        else:
            kpis['throughput_cases_per_day'] = num_cases # All cases completed within a day
    else:
        kpis['throughput_cases_per_day'] = 0

    return kpis

def identify_bottlenecks(event_log):
    """
    Identifies potential bottlenecks based on average activity duration.
    This is a simplification; a real bottleneck analysis would require more context.
    """
    activity_durations = {}
    for case_id, group in event_log.groupby('case_id'):
        group = group.sort_values(by='timestamp').reset_index(drop=True)
        for i in range(len(group) - 1):
            activity_name = group.loc[i, 'activity']
            start_time = group.loc[i, 'timestamp']
            next_activity_time = group.loc[i+1, 'timestamp']
            duration = (next_activity_time - start_time).total_seconds() # Duration of an activity or wait time until next
            activity_durations.setdefault(activity_name, []).append(duration)

    avg_activity_durations = {
        activity: timedelta(seconds=sum(durations) / len(durations))
        for activity, durations in activity_durations.items()
    }

    if avg_activity_durations:
        # Sort activities by average duration in descending order
        bottlenecks = sorted(avg_activity_durations.items(), key=lambda item: item[1], reverse=True)
        return bottlenecks[:3] # Top 3 longest activities/waits
    return []

def run_process_mining(file_path):
    """
    Main function to run the process mining analysis.
    """
    event_log = load_event_log(file_path)
    if event_log is None or event_log.empty:
        print("No event log data to process.")
        return

    print(f"\n--- Process Mining Report for: {file_path} ---")

    # 1. Process Discovery
    print("\n1. Discovered Process Flows:")
    process_flows = discover_process_flow(event_log)
    sorted_flows = sorted(process_flows.items(), key=lambda item: item[1], reverse=True)
    for flow, count in sorted_flows:
        print(f"  - {' -> '.join(flow)} (Count: {count})")
    print(f"\nTotal unique process paths discovered: {len(process_flows)}")

    # 2. Key Performance Indicators (KPIs)
    print("\n2. Key Performance Indicators (KPIs):")
    kpis = calculate_kpis(event_log)
    for kpi, value in kpis.items():
        print(f"  - {kpi.replace('_', ' ').title()}: {value}")

    # 3. Bottleneck Identification
    print("\n3. Potential Bottleneck Activities (Simplified based on average duration):")
    bottlenecks = identify_bottlenecks(event_log)
    if bottlenecks:
        for activity, avg_duration in bottlenecks:
            print(f"  - Activity/Transition '{activity}' (Avg Duration/Wait: {avg_duration})")
        print("\nNote: This is a simplified bottleneck analysis. A comprehensive analysis would require more data (e.g., resource availability, queue times).")
    else:
        print("  No significant bottlenecks identified with this method or insufficient data.")

    print("\n--- End of Report ---")

if __name__ == "__main__":
    # Create a dummy event log CSV for demonstration
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
    dummy_file_path = 'sample_event_log.csv'
    dummy_df.to_csv(dummy_file_path, index=False)
    print(f"Generated dummy event log at {dummy_file_path}")

    # Run the process mining engine with the dummy data
    run_process_mining(dummy_file_path)

    # Example with a missing file
    # run_process_mining('non_existent_log.csv')

    # Example with missing columns (uncomment to test)
    # broken_data = {'case_id': [1], 'activity': ['Test']}
    # broken_df = pd.DataFrame(broken_data)
    # broken_df.to_csv('broken_log.csv', index=False)
    # run_process_mining('broken_log.csv')