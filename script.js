import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
query;
const firebaseConfig = {
  apiKey: "AIzaSyCynS0fBEQNjZ51eRJS4GPHqBUJaZ8j2EA",
  authDomain: "ecommerce-217d0.firebaseapp.com",
  projectId: "ecommerce-217d0",
  storageBucket: "ecommerce-217d0.firebasestorage.app",
  messagingSenderId: "1063978456472",
  appId: "1:1063978456472:web:95e50d9f7a8b32e42a07ed",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = collection(db, "product");

const querySnapshot = await getDocs(q);
let loading = document.getElementById("loading");

loading.style.display = "none"

let showData = document.getElementById("show-data");
querySnapshot.forEach((doc) => {
  let data = doc.data();
  showData.innerHTML += `<div class="bg-white shadow-md rounded-xl p-5">
        <img src="${data.imageUrl}" 
             class="w-full h-40 object-cover rounded-lg mb-3"
             onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">

        <h2 class="text-xl font-bold text-blue-600">${data.hotel}</h2>
        <p><strong>Food:</strong> ${data.foodname}</p>
        <p><strong>Quantity:</strong> ${data.quantity}</p>
        <p><strong>Delivery Time:</strong> ${data.time}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p class="text-green-600 font-bold">$${data.price}</p>

        
      </div>`;
});
window.button = () => {

    window.location.href = "../admin/index.html"
}