"""
Train insurance premium prediction model with SHAP explainability.
"""

import pandas as pd
import numpy as np
import joblib
import matplotlib
matplotlib.use("Agg")  # non-interactive backend
import matplotlib.pyplot as plt
import shap
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error

# ── 1. Load data ──────────────────────────────────────────────
df = pd.read_csv("data.csv")
print(f"Loaded {len(df)} rows from data.csv")

FEATURES = ["age", "occupation_risk", "zone_risk", "health_score", "income", "claim_history"]
TARGET = "premium"

X = df[FEATURES]
y = df[TARGET]

# ── 2. Train/test split ──────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Train: {len(X_train)} | Test: {len(X_test)}")

# ── 3. Train model ───────────────────────────────────────────
model = GradientBoostingRegressor(
    n_estimators=800,
    max_depth=4,
    learning_rate=0.03,
    subsample=0.85,
    min_samples_split=8,
    min_samples_leaf=4,
    max_features=0.8,
    random_state=42,
)

model.fit(X_train, y_train)

# ── 4. Evaluate ──────────────────────────────────────────────
y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"\n📊 RMSE: {rmse:.4f} ₹")

if rmse >= 8:
    print("⚠️  RMSE >= 8 — model needs improvement")
else:
    print(f"✅ RMSE < 8  — target met!")

# ── 5. SHAP explainability ───────────────────────────────────
print("\n🔍 Computing SHAP values...")
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Summary plot
shap.summary_plot(shap_values, X_test, feature_names=FEATURES, show=False, plot_type="bar")
plt.tight_layout()
plt.savefig("shap_summary.png", dpi=150, bbox_inches="tight")
plt.close()
print("✅ SHAP summary saved → shap_summary.png")

# Feature importance ranking
importances = np.abs(shap_values).mean(axis=0)
ranking = sorted(zip(FEATURES, importances), key=lambda x: x[1], reverse=True)
print("\n📈 SHAP Feature Importance Ranking:")
for rank, (feat, imp) in enumerate(ranking, 1):
    print(f"  {rank}. {feat:<15} → {imp:.4f}")

# Verify zone_risk is top feature
top_feature = ranking[0][0]
print(f"\n🎯 Top feature: '{top_feature}'")
if top_feature == "zone_risk":
    print("✅ zone_risk is the #1 influencing feature!")
else:
    print("⚠️  zone_risk is NOT the top feature")

# ── 6. Save model ────────────────────────────────────────────
model_artifact = {
    "model": model,
    "features": FEATURES,
    "rmse": rmse,
}
joblib.dump(model_artifact, "premium_model.pkl")
print("\n💾 Model saved → premium_model.pkl")

# ── 7. Quick inference demo ──────────────────────────────────
sample = pd.DataFrame([{
    "age": 32,
    "occupation_risk": 3,
    "zone_risk": 4,
    "health_score": 60,
    "income": 22000,
    "claim_history": 2,
}])
pred = model.predict(sample)[0]
print(f"\n🧪 Demo prediction: ₹{pred:.2f}")
