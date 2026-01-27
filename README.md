# FailureSense  
### Intelligent Predictive Maintenance & Decision Support System

FailureSense is an end-to-end machine learning system designed to predict industrial machine failures using sensor data, analyze operating regimes, and provide human-readable maintenance recommendations.

The project is built with a strong focus on **engineering discipline, interpretability, and real-world deployment readiness**, rather than just model accuracy.

---

## 🚀 Problem Statement

Unplanned machine failures in industrial environments lead to:
- Production downtime
- Increased maintenance costs
- Safety risks
- Inefficient resource utilization

Traditional rule-based monitoring systems fail to adapt to complex, non-linear patterns in sensor data.  
FailureSense aims to address this gap using data-driven intelligence.

---

## 🧠 Solution Overview

FailureSense combines classical machine learning, ensemble methods, deep learning, and explainable AI techniques to deliver:

- **Early failure prediction** from sensor readings
- **Operating regime discovery** using unsupervised learning
- **Model comparison across paradigms** (classical ML → deep learning)
- **Human-readable explanations and maintenance recommendations**
- **Deployment-ready architecture** for real-world usage

---

## ✨ Key Features & Novelty

### 1. Imbalance-Aware Failure Prediction
- Explicit handling of rare failure events
- Evaluation using ROC-AUC, recall, and confusion matrices
- Designed for cost-sensitive decision-making

### 2. Two-Stage Intelligence Design
- Stage 1: Predict *whether* a machine is likely to fail
- Stage 2: Explain *why* a failure is likely and suggest actions

### 3. Operating Regime Discovery
- K-Means and Hierarchical clustering to identify distinct machine operating conditions
- Useful for understanding stress patterns beyond labeled failures

### 4. Model Spectrum Analysis
- Linear & Logistic Regression
- Naïve Bayes, Decision Tree
- KNN, SVM
- Bagging, Boosting, Stacking
- ANN and 1D CNN (with justified adaptation)

### 5. Explainability via Generative AI
- Prompt-based failure explanation
- Maintenance recommendation generation
- GenAI positioned as a **decision-support assistant**, not a black box

---

## 🗂️ Project Structure

```text
failuresense/
│
├── data/
│   └── raw/                  # Original dataset
│
├── notebooks/
│   ├── 01_data_understanding.ipynb
│   ├── 02_data_preprocessing_and_visuals.ipynb
│   ├── 03_baseline_models.ipynb
│   ├── 04_naive_bayes_and_decision_tree.ipynb
│   ├── 05_knn_and_svm_models.ipynb
│   ├── 06_ensemble_models.ipynb
│   ├── 07_clustering_analysis.ipynb
│   ├── 08_ann_model.ipynb
│   ├── 09_cnn_model.ipynb
│   ├── 10_nlp_basics.ipynb
│   └── 11_generative_ai_module.ipynb
│
├── src/                       # (To be populated during productization)
├── requirements.txt
└── README.md
