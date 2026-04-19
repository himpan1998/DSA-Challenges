# 📘 Assignment 2: OCR with Non-linear Models

---

## 🏫 Course Information
- **Course Name:** 8810 Machine Learning for Public Policy  
- **Instructor:** Prof. Sugat Chaturvedi  
- **Submission Date:** 23 April, 2026  

---

## 👨‍🎓 Student Details
- **Name:** Himanshu Pandey  
- **Entry No:** 2025SMZ8477  

---

## 📌 Overview
This assignment focuses on handwritten digit classification (OCR) using the MNIST dataset.  
Different machine learning approaches are implemented and compared, including:
- Linear models  
- Quadratic (non-linear) features  
- Neural networks  
- Threshold tuning  
- Unsupervised clustering  

---

## 📂 Files in this Repository

| File | Description |
|-----|-------------|
| `assignment2.ipynb / .py` | Complete code implementation |
| `mnist_train.csv` | Training dataset (60,000 samples) |
| `mnist_test.csv` | Test dataset (10,000 samples) |
| `Assignment_Report.pdf` | Final written answers (Q a–e) |

---

## 🔍 Tasks Summary

### (a) Linear vs Quadratic Models
- Logistic Regression with:
  - Linear features
  - Quadratic features
- Compared using Macro Precision, Recall, F1

### (b) Regularization Analysis
- Studied effect of α (regularization parameter)
- Observed optimal α remains same but sensitivity increases

### (c) Neural Network
- Multi-Layer Perceptron (MLP)
- Best architecture: **(256, 128)**

### (d) Threshold Tuning
- Higher threshold → higher F1  
- Lower coverage → fewer predictions  

### (e) Clustering-based Labeling
- MiniBatch K-Means clustering
- Labels assigned via majority voting

---

## 📊 Key Results

| Model                          | Macro F1 |
|--------------------------------|----------|
| Logistic Regression (Linear)   | 0.9128   |
| Logistic Regression (Quadratic)| 0.9423   |
| Neural Network (MLP)           | 0.9818   |
| Clustering (k = 300)           | 0.9090   |

---

## 🧠 Key Insights
- Non-linear models improve performance significantly  
- Neural networks achieve highest accuracy  
- Quadratic features increase computation cost  
- Threshold tuning introduces accuracy–coverage trade-off  
- Clustering works without labels but has lower accuracy  

---

## ⚙️ Requirements

pip install numpy pandas scikit-learn matplotlib

---

## ▶️ How to Run

1. Place datasets in the working directory:
   - mnist_train.csv
   - mnist_test.csv

2. Run:
   python assignment2.py

or open the Jupyter notebook.

---

## 📈 Dataset
- MNIST Handwritten Digits
- 28 × 28 grayscale images
- 10 classes (0–9)

---

## 🎯 Conclusion
Neural networks outperform all other models, achieving the best balance between accuracy and efficiency.  
Clustering provides a useful alternative when labels are unavailable but is less accurate than supervised learning.

---

## ✅ Status
✔ Completed  
✔ Results verified  
✔ Ready for submission  
