import pandas as pd
from datetime import datetime, timedelta
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression # For market trend prediction
from sklearn.feature_extraction.text import TfidfVectorizer # For sentiment analysis (conceptual)
from sklearn.naive_bayes import MultinomialNB # For sentiment analysis (conceptual)
from sklearn.pipeline import make_pipeline
from textblob import TextBlob # Simple sentiment analysis for demo

def simulate_market_data():
    """
    Simulates market data (e.g., stock price, news sentiment score).
    """
    start_date = datetime(2023, 1, 1)
    dates = [start_date + timedelta(days=i) for i in range(100)]
    
    market_prices = [100 + i * 0.5 + (i % 10 - 5) * 2 for i in range(100)] # Basic upward trend with fluctuations
    
    # Simulate news sentiment
    sentiments = [
        "Company stock up, strong earnings reported!",
        "Economic slowdown concerns rise.",
        "New product launched with positive reception.",
        "Supply chain issues impacting production.",
        "Analyst upgrades rating, confident outlook.",
        "Consumer confidence index drops unexpectedly.",
        "Partnership announced, market reacts favorably.",
        "Competitor gains market share.",
        "Innovative tech showcased at conference.",
        "Inflation fears loom large."
    ]
    news_sentiment_scores = [TextBlob(s).sentiment.polarity * 10 for s in (sentiments * 10)[:100]] # Scale for effect
    
    data = pd.DataFrame({
        'date': dates,
        'market_price': market_prices,
        'news_sentiment': news_sentiment_scores,
        'news_headline': (sentiments * 10)[:100] # For conceptual NLP
    })
    return data

def simulate_consumer_feedback_data():
    """
    Simulates consumer feedback data.
    """
    feedback = [
        "The product is great, very intuitive to use!", # Positive
        "Customer service was slow, very frustrating experience.", # Negative (service pain point)
        "Love the new features, makes my work so much easier.", # Positive
        "The pricing is too high for what it offers, considering alternatives.", # Negative (price pain point)
        "Seamless integration with my existing tools.", # Positive
        "I wish there was a mobile app. The web interface is clunky on my phone.", # Negative (mobile experience pain point)
        "Fantastic support team, quick and helpful response.", # Positive
        "Data export functionality is very limited, need more options.", # Negative (feature pain point)
        "Highly recommend this solution for small businesses.", # Positive
        "The onboarding process was confusing, many steps unclear." # Negative (onboarding pain point)
    ]
    
    feedback_data = pd.DataFrame({
        'timestamp': [datetime.now() - timedelta(days=i) for i in range(len(feedback))],
        'feedback_text': feedback,
    })
    return feedback_data

def analyze_market_swings(market_data):
    """
    Analyzes market data for swings and predicts future trends.
    Uses a simple linear regression for price trend and sentiment for early indicators.
    """
    print("\n--- Market Swings Analysis ---")
    
    # Feature engineering: lagged prices, rolling averages
    market_data['price_lag1'] = market_data['market_price'].shift(1)
    market_data['rolling_avg_price'] = market_data['market_price'].rolling(window=5).mean().shift(1)
    market_data = market_data.dropna()

    if market_data.empty:
        print("Insufficient market data for analysis.")
        return

    X = market_data[['price_lag1', 'rolling_avg_price', 'news_sentiment']]
    y = market_data['market_price']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)

    print(f"  Market Price Prediction (Linear Regression) MAE: {mean_absolute_error(y_test, predictions):.2f}")
    print(f"  Market Price Prediction (Linear Regression) R2: {r2_score(y_test, predictions):.2f}")

    # Identify potential upcoming swings based on recent sentiment
    latest_sentiment = market_data['news_sentiment'].iloc[-1]
    if latest_sentiment < -5: # Arbitrary threshold for negative swing
        print(f"\n  Potential Downward Swing Alert: Latest news sentiment ({latest_sentiment:.2f}) is significantly negative.")
        print("  Recommendation: Consider hedging strategies or reviewing market exposure.")
    elif latest_sentiment > 5: # Arbitrary threshold for positive swing
        print(f"\n  Potential Upward Swing Opportunity: Latest news sentiment ({latest_sentiment:.2f}) is significantly positive.")
        print("  Recommendation: Explore opportunities for investment or expansion.")
    else:
        print(f"\n  Market sentiment ({latest_sentiment:.2f}) is relatively neutral. Monitor for shifts.")

    # Show a sample prediction
    if not X_test.empty:
        sample_input = X_test.iloc[-1:].copy()
        next_day_price_pred = model.predict(sample_input)[0]
        print(f"  Predicted next day's market price (based on last known data): ${next_day_price_pred:.2f}")

def identify_consumer_pain_points(feedback_data):
    """
    Identifies consumer pain points using sentiment and keyword analysis.
    """
    print("\n--- Consumer Pain Points Identification ---")

    if feedback_data.empty:
        print("No consumer feedback data for analysis.")
        return

    # Basic sentiment analysis using TextBlob
    feedback_data['sentiment_score'] = feedback_data['feedback_text'].apply(lambda text: TextBlob(text).sentiment.polarity)
    
    negative_feedback = feedback_data[feedback_data['sentiment_score'] < 0]

    if not negative_feedback.empty:
        print("\n  Identified Negative Feedback Samples:")
        for _, row in negative_feedback.head(3).iterrows():
            print(f"    - '{row['feedback_text']}' (Sentiment: {row['sentiment_score']:.2f})")

        # Conceptual keyword extraction for pain points
        common_pain_points = {
            'slow service': ['slow', 'delay', 'wait', 'frustrat'],
            'high price': ['price', 'expensive', 'cost', 'charge'],
            'missing feature': ['missing', 'lack', 'wish', 'no app', 'limited'],
            'confusing process': ['confus', 'unclear', 'onboard', 'difficult']
        }
        
        pain_point_summary = {}
        for text in negative_feedback['feedback_text']:
            text_lower = text.lower()
            for pp_category, keywords in common_pain_points.items():
                if any(keyword in text_lower for keyword in keywords):
                    pain_point_summary[pp_category] = pain_point_summary.get(pp_category, 0) + 1
        
        if pain_point_summary:
            print("\n  Summary of Potential Pain Points:")
            sorted_pain_points = sorted(pain_point_summary.items(), key=lambda item: item[1], reverse=True)
            for pp, count in sorted_pain_points:
                print(f"    - '{pp}': {count} instances")
            
            top_pain_point = sorted_pain_points[0][0]
            print(f"\n  Recommendation for '{top_pain_point}':")
            if 'service' in top_pain_point:
                print("    - Implement AI-powered chatbots for instant query resolution or optimize staffing levels for faster response times.")
            elif 'price' in top_pain_point:
                print("    - Analyze competitor pricing, offer tiered plans, or highlight value proposition more clearly.")
            elif 'feature' in top_pain_point:
                print("    - Prioritize development of requested features (e.g., mobile app, advanced export) based on user demand.")
            elif 'process' in top_pain_point:
                print("    - Implement AI-guided onboarding or interactive tutorials to simplify complex processes.")
            else:
                print("    - Further investigate root causes and develop targeted solutions.")
        else:
            print("\n  No specific pain points identified using keyword matching for negative feedback.")
    else:
        print("\n  No significant negative feedback to analyze.")


def run_market_consumer_analytics():
    """
    Main function to run market swings and consumer pain points predictive analytics.
    """
    print("\n--- Running Market & Consumer Predictive Analytics ---")

    # 1. Simulate and analyze market data
    market_data = simulate_market_data()
    analyze_market_swings(market_data)

    # 2. Simulate and identify consumer pain points
    consumer_feedback_data = simulate_consumer_feedback_data()
    identify_consumer_pain_points(consumer_feedback_data)

    print("\n--- End of Market & Consumer Report ---")

if __name__ == "__main__":
    # Ensure TextBlob is downloaded (run once)
    try:
        TextBlob("test")
    except LookupError:
        import nltk
        nltk.download('punkt')
        nltk.download('averaged_perceptron_tagger')
        print("Downloaded NLTK data for TextBlob.")
    
    run_market_consumer_analytics()