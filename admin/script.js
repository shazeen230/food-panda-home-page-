import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

import {
  getFirestore,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc
} from 
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCynS0fBEQNjZ51eRJS4GPHqBUJaZ8j2EA",
  authDomain: "ecommerce-217d0.firebaseapp.com",
  projectId: "ecommerce-217d0",
  storageBucket: "ecommerce-217d0.firebasestorage.app",
  messagingSenderId: "1063978456472",
  appId: "1:1063978456472:web:95e50d9f7a8b32e42a07ed"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let selectedId = null;

window.product = async () => {
  const hotel = document.getElementById("hotel").value;
  const foodname = document.getElementById("foodname").value;
  const quantity = document.getElementById("quantity").value;
  const time = document.getElementById("time").value;
  const price = document.getElementById("price").value;
  const location = document.getElementById("location").value;
  const imageUrl = document.getElementById("imageUrl").value; //

  if (!foodname) {
    alert("Food name is required!");
    return;
  }

  const id = Date.now().toString();

  await setDoc(doc(db, "product", id), {
    hotel,
    foodname,
    quantity,
    time,
    price,
    location,
    imageUrl   
  });

  clearForm();
  showAllProducts();
};

window.deleteProduct = async (id) => {
  await deleteDoc(doc(db, "product", id));
  showAllProducts();
};

window.editProduct = async (id) => {
  const docRef = doc(db, "product", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    selectedId = id;
    const data = docSnap.data();

    document.getElementById("hotel").value = data.hotel;
    document.getElementById("foodname").value = data.foodname;
    document.getElementById("quantity").value = data.quantity;
    document.getElementById("time").value = data.time;
    document.getElementById("price").value = data.price;
    document.getElementById("location").value = data.location;
    document.getElementById("imageUrl").value = data.imageUrl; 
  }
};

window.updateProduct = async () => {
  if (!selectedId) {
    alert("Select a product to edit first!");
    return;
  }

  await updateDoc(doc(db, "product", selectedId), {
    hotel: document.getElementById("hotel").value,
    foodname: document.getElementById("foodname").value,
    quantity: document.getElementById("quantity").value,
    time: document.getElementById("time").value,
    price: document.getElementById("price").value,
    location: document.getElementById("location").value,
    imageUrl: document.getElementById("imageUrl").value // 
  });

  clearForm();
  showAllProducts();
};

window.cancel = () => {
  clearForm();
};

function clearForm() {
  document.getElementById("hotel").value = "";
  document.getElementById("foodname").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("time").value = "";
  document.getElementById("price").value = "";
  document.getElementById("location").value = "";
  document.getElementById("imageUrl").value = ""; 
  selectedId = null;
}

async function showAllProducts() {
  const showdata = document.getElementById("showdata");
  showdata.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "product"));

  querySnapshot.forEach(docItem => {
    const data = docItem.data();
    const id = docItem.id;

    showdata.innerHTML += `
      <div class="bg-white shadow-md rounded-xl p-5">
        <img src="${data.imageUrl}" 
             class="w-full h-40 object-cover rounded-lg mb-3"
             onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">

        <h2 class="text-xl font-bold text-blue-600">${data.hotel}</h2>
        <p><strong>Food:</strong> ${data.foodname}</p>
        <p><strong>Quantity:</strong> ${data.quantity}</p>
        <p><strong>Delivery Time:</strong> ${data.time}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p class="text-green-600 font-bold">$${data.price}</p>

        <div class="flex gap-2 mt-3">
          <button onclick="editProduct('${id}')"
            class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg">
            Edit
          </button>

          <button onclick="deleteProduct('${id}')"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
            Delete
          </button>
        </div>
      </div>
    `;
  });
}

showAllProducts();