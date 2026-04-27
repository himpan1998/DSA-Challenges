
---

## 📊 Dataset Description

- **Total records:** 381,109  
- **Target Variable:** `Response`  
  - `1` → Interested  
  - `0` → Not Interested  

### 🔹 Key Features
- Demographic: Age, Gender  
- Economic: Annual Premium  
- Behavioral: Vehicle Age, Damage history  
- Interaction: Sales Channel, Vintage  
- Geographic: Region Code  

⚠️ Dataset is **highly imbalanced (~12% positive class)**

---

## 🔍 Key Insights (EDA)

- Majority customers are not interested (~88%)  
- Customers with **vehicle damage history** show higher interest  
- **Older vehicles (>2 years)** → highest response rate  
- **Middle-aged customers** more likely to respond  
- Slight variation across gender and premium segments  

---

## ⚙️ Machine Learning Models

- Logistic Regression ⭐ (Best Model)  
- Decision Tree  
- Random Forest  
- XGBoost  
- CatBoost  

---

## 📈 Model Performance

| Metric        | Value Range |
|--------------|------------|
| Accuracy     | ~69–70%    |
| Precision    | ~27–28%    |
| Recall       | ~93–94%    |
| F1 Score     | ~0.42–0.43 |
| ROC-AUC      | ~0.84–0.85 |
| PR-AUC       | ~0.31–0.36 |

### 🎯 Key Observation

- High Recall → Most interested customers captured  
- Low Precision → Many false positives  

👉 Model follows a **recall-focused strategy**

---

## 📉 Confusion Matrix Insight

- Very few **missed customers (FN low)**  
- Large number of **false positives (FP high)**  

✔ Good for marketing reach  
❌ Inefficient targeting cost  

---

## 📊 Model Evaluation Visuals

### 🔹 ROC Curve (AUROC ≈ 0.85)
- Strong class separation  

### 🔹 Precision-Recall Curve (AUPRC ≈ 0.34)
- Moderate performance due to imbalance  

---

## ⚖️ Fairness Analysis

### 🔹 Gender
- Male recall slightly higher  
- Female customers more likely to be missed  

👉 ⚠️ Mild gender bias  

---

### 🔹 Premium Group
- High premium → highest predicted rate (~48%)  
- Low/Medium → lower targeting  

👉 ⚠️ Bias toward high-value customers  

---

### 🔹 Vehicle Age
- >2 years → extremely high prediction (~98%)  
- <1 year → very low prediction  

👉 ⚠️ Strong behavioral bias  

---

## 📊 Key Visualizations Included

✔ Response Distribution  
✔ Model Comparison (Accuracy, F1, ROC-AUC)  
✔ ROC & PR Curves  
✔ Confusion Matrix  
✔ Gender Fairness Plot  
✔ Premium Fairness Plot  
✔ Vehicle Age Fairness Plot  

---

## 🧾 Policy Implications

This study highlights a critical trade-off:

### ⚖️ Efficiency vs Fairness

- ML improves targeting efficiency  
- But creates **unequal outcomes across groups**

### 🔑 Recommendations

- Use model as **decision-support tool (not automation)**  
- Perform **regular fairness audits**  
- Adjust thresholds based on policy goals  
- Avoid exclusion of vulnerable groups  

---

## ⚠️ Limitations

- Observational dataset (no causal inference)  
- Low precision (high false positives)  
- Potential hidden bias in features  

---

## 🚀 Future Work

- Fairness-aware algorithms  
- Threshold optimization  
- Explainability (SHAP/LIME)  
- Causal ML approaches  

---

## 🧠 Key Takeaways

- High recall ≠ fair system  
- ML decisions impact **who gets targeted**  
- Fairness is essential in policy-sensitive domains  
- Responsible AI is critical in finance  

---

## 👨‍🎓 Authors

Himanshu Pandey (2025SMZ8477)  
Sonalika Ray (2025PPZ8087)  

Department of Management Studies (DMS)  
Indian Institute of Technology Delhi  

---

## 📘 Course Information

**Course:** SPL8810 – Machine Learning for Public Policy  
**Instructor:** Prof. Sugat Chaturvedi  

---

## ⭐ Final Note

This project demonstrates how machine learning can be integrated with fairness and policy considerations to build **responsible AI systems for real-world applications**.

---
