// Importation des fonctions Firebase depuis les CDN (version modulaire)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuration Firebase – Remplacez les valeurs par celles de votre projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUS7vhnedR6z2bsZ4uMagnOh23WXVWf3M",
  authDomain: "burban-suivi-colis.firebaseapp.com",
  projectId: "burban-suivi-colis",
  storageBucket: "burban-suivi-colis.firebasestorage.app",
  messagingSenderId: "921458979454",
  appId: "1:921458979454:web:8a887ac603c31b1c34de2f",
  measurementId: "G-RTQER5MW7S"
};

// Initialisation de Firebase et Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fonction de suivi de colis
document.getElementById("trackButton").addEventListener("click", async () => {
  const trackingNumber = document.getElementById("trackingNumber").value.trim();
  const resultDiv = document.getElementById("result");

  if (!trackingNumber) {
    resultDiv.textContent = "Veuillez entrer un numéro de suivi.";
    return;
  }
  
  try {
    // Supposons que les colis soient stockés dans une collection "colis" avec pour ID le numéro de suivi
    const docRef = doc(db, "colis", trackingNumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      resultDiv.innerHTML = `
        <h2>Statut du colis :</h2>
        <p><strong>Expéditeur :</strong> ${data.sender}</p>
        <p><strong>Destinataire :</strong> ${data.receiver}</p>
        <p><strong>Statut :</strong> ${data.status}</p>
        <p><strong>Date :</strong> ${data.date}</p>
      `;
    } else {
      resultDiv.textContent = "Colis non trouvé.";
    }
  } catch (error) {
    console.error("Erreur lors du suivi :", error);
    resultDiv.textContent = "Erreur lors du suivi du colis.";
  }
});
