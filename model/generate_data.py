"""
Generate synthetic worker insurance data for premium prediction model.
"""

import numpy as np
import pandas as pd

np.random.seed(42)

N = 5000

# --- Features ---
age = np.random.randint(18, 65, N)

# Occupation risk: 1 (low) to 5 (very high)
occupation_risk = np.random.choice([1, 2, 3, 4, 5], N, p=[0.15, 0.25, 0.30, 0.20, 0.10])

# Zone risk: 1 (safe) to 5 (dangerous)
zone_risk = np.random.choice([1, 2, 3, 4, 5], N, p=[0.10, 0.20, 0.35, 0.25, 0.10])

# Health score: 0-100 (higher = better health)
health_score = np.clip(np.random.normal(65, 15, N), 10, 100)

# Monthly income (INR)
income = np.clip(np.random.normal(25000, 8000, N), 8000, 60000)

# Claim history: number of past claims (0-10)
claim_history = np.random.poisson(lam=1.5, size=N)
claim_history = np.clip(claim_history, 0, 10)

# --- Premium formula (realistic, in INR) ---
# Base premium
base = 200

# Zone risk impact (strong): each level adds ~₹80-120
zone_impact = zone_risk * 95

# Health score impact (inverse): poor health = higher premium
health_impact = (100 - health_score) * 2.5

# Occupation risk impact: each level adds ~₹40-60
occupation_impact = occupation_risk * 50

# Age impact: older workers pay slightly more
age_impact = np.where(age > 45, (age - 45) * 8, 0)

# Income correlation: higher income → slightly higher coverage
income_impact = (income / 10000) * 15

# Claim history impact: each past claim adds ~₹30
claim_impact = claim_history * 30

# Combine with small noise
noise = np.random.normal(0, 3, N)

premium = (
    base
    + zone_impact
    + health_impact
    + occupation_impact
    + age_impact
    + income_impact
    + claim_impact
    + noise
)

premium = np.round(np.clip(premium, 100, None), 2)

# --- Build DataFrame ---
df = pd.DataFrame({
    "age": age,
    "occupation_risk": occupation_risk,
    "zone_risk": zone_risk,
    "health_score": np.round(health_score, 1),
    "income": np.round(income, 2),
    "claim_history": claim_history,
    "premium": premium,
})

# Save
df.to_csv("data.csv", index=False)
print(f"✅ Generated {len(df)} rows → data.csv")
print(f"\nPremium stats:\n{df['premium'].describe()}")
print(f"\nFeature correlations with premium:")
print(df.corr()["premium"].sort_values(ascending=False))
