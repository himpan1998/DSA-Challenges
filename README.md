
---
# Fairness and Consumer Protection in AI-driven Insurance Cross-Selling

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Machine Learning](https://img.shields.io/badge/Machine-Learning-green)
![Fairness](https://img.shields.io/badge/AI-Fairness-critical)
![Status](https://img.shields.io/badge/Project-Completed-success)

## Authors
<sub>
Himanshu Pandey (2025SMZ8477), Department of Management Studies (DMS), IIT Delhi  
Sonalika Ray (2025PPZ8087), School of Public Policy (SPP), IIT Delhi 
</sub>
<sub>
Course: SPL8810 – Machine Learning for Public Policy  
Instructor: Prof. Sugat Chaturvedi
</sub>

---

## Project Overview

This project develops a **machine learning-based decision support system** to predict whether existing vehicle insurance customers are likely to purchase **health insurance**.

Unlike traditional ML projects, this study goes beyond prediction and focuses on:

✔ Model performance  
✔ Fairness across customer groups  
✔ Policy and ethical implications  

The goal is to ensure that AI-driven systems are **accurate, fair, and policy-relevant**.

---

## Objectives

- Predict customer interest in health insurance  
- Compare multiple ML models  
- Handle class imbalance effectively  
- Evaluate fairness across:
  - Gender  
  - Premium Group  
  - Vehicle Age  
  - Region  
- Provide actionable **policy insights**

---

## Project Structure


## Dataset Description

- **Total records:** 381,109  
- **Target Variable:** `Response`  
  - `1` → Interested  
  - `0` → Not Interested  

### Key Features
- Demographic: Age, Gender  
- Economic: Annual Premium  
- Behavioral: Vehicle Age, Damage history  
- Interaction: Sales Channel, Vintage  
- Geographic: Region Code  

 Dataset is **highly imbalanced (~12% positive class)**

---

## Expolatory Data Analysis

- Majority customers are not interested (~88%)  
- Customers with **vehicle damage history** show higher interest  
- **Older vehicles (>2 years)** → highest response rate  
- **Middle-aged customers** more likely to respond  
- Slight variation across gender and premium segments  

---

## Machine Learning Models

- Logistic Regression 
- Decision Tree  
- Random Forest  
- XGBoost  
- CatBoost  

---

## Model Performance

| Metric        | Value Range |
|--------------|------------|
| Accuracy     | ~69–70%    |
| Precision    | ~27–28%    |
| Recall       | ~93–94%    |
| F1 Score     | ~0.42–0.43 |
| ROC-AUC      | ~0.84–0.85 |
| PR-AUC       | ~0.31–0.36 |

### Key Observation

- High Recall → Most interested customers captured  
- Low Precision → Many false positives  

 Model follows a **recall-focused strategy**

---

##  Confusion Matrix Insight

- Very few **missed customers (FN low)**  
- Large number of **false positives (FP high)**  

✔ Good for marketing reach  
Inefficient targeting cost  

---

## Model Evaluation Visuals

###  ROC Curve (AUROC ≈ 0.85)
- Strong class separation  

### Precision-Recall Curve (AUPRC ≈ 0.34)
- Moderate performance due to imbalance  

---

## Fairness Analysis

### Gender
- Male recall slightly higher  
- Female customers more likely to be missed  

 Mild gender bias  

---

### Premium Group
- High premium → highest predicted rate (~48%)  
- Low/Medium → lower targeting  

Bias toward high-value customers  

---

### Vehicle Age
- >2 years → extremely high prediction (~98%)  
- <1 year → very low prediction  

Strong behavioral bias  

---

## Key Visualizations Included

✔ Response Distribution  
✔ Model Comparison (Accuracy, F1, ROC-AUC)  
✔ ROC & PR Curves  
✔ Confusion Matrix  
✔ Gender Fairness Plot  
✔ Premium Fairness Plot  
✔ Vehicle Age Fairness Plot  

---

##  Policy Implications

This study highlights a critical trade-off:

### Efficiency vs Fairness

- ML improves targeting efficiency  
- But creates **unequal outcomes across groups**

### Recommendations

- Use model as **decision-support tool (not automation)**  
- Perform **regular fairness audits**  
- Adjust thresholds based on policy goals  
- Avoid exclusion of vulnerable groups  

---

##  Limitations

- Observational dataset (no causal inference)  
- Low precision (high false positives)  
- Potential hidden bias in features  

---

##  Future Work

- Fairness-aware algorithms  
- Threshold optimization  
- Explainability (SHAP/LIME)  
- Causal ML approaches  

---

##  Key Takeaways

- High recall ≠ fair system  
- ML decisions impact **who gets targeted**  
- Fairness is essential in policy-sensitive domains  
- Responsible AI is critical in finance  

---

---

##  Final Note

This project demonstrates how machine learning can be integrated with fairness and policy considerations to build **responsible AI systems for real-world applications**.

---
