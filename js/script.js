const categories = async ()=>{
    const catagoriesBox = document.getElementById('catagoriess');
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
      

    // Loop through each category and display its name and id
    data.categories.forEach((items) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div id="btn-${items.category}" onclick="searchData('${items.category}')" class="flex justify-center items-center gap-5 py-6 rounded-lg border-2 cursor-pointer hover:bg-green-200">
        <span><img src="${items.category_icon}" /></span>
        <span class="font-bold">${items.category}</span>
        </div>
        `
        catagoriesBox.appendChild(div)
    });
    
}

// Click searching data looking in window

const searchData = async (category) => {
    removeActiveClass();
    const animal = document.getElementById('animal').innerHTML="";
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await response.json();
    const loading = document.getElementById("loadding");
    const boxStyles = document.getElementById(`btn-${category}`);
    boxStyles.classList.add('bg-green-200');
    
    if(data.data.length === 0) {
        const loadings = document.getElementById("loadding");
        loadings.style.display = "block";
        setTimeout(()=>{
            loadings.style.display = "none";
            document.getElementById('animal').innerHTML=`
              <div class="flex flex-col justify-center items-center border col-span-3 rounded-lg py-10">
                <img src="images/error.webp" alt="not found image" />
                <h2 class="text-center text-gray-700 text-4xl">No data found</h2>
              </div>
            `;
        }, 2000)
        return;
    }
    
    data.data.forEach((items) => {
        const loading = document.getElementById("loadding");
        loading.style.display = "block";
      setTimeout(()=>{
        loading.style.display = "none";
        const div = document.createElement('div');
        div.innerHTML = `
        <div class=" rounded-lg border-2 p-4">
            <span><img class="w-full h-[250px] object-cover rounded-lg mb-5" src="${items.image}" /></span>
            <h2 class="font-bold text-2xl mb-4">${items.category}</h2>
            <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-qrcode"></i> Breed: ${items.breed?items.breed : "Unknown"}</P>
            <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-calendar"></i> Birth: ${items.date_of_birth?items.date_of_birth : "Not available"}</P>
            <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-person-half-dress"></i> Gender: ${items.gender?items.gender : "Not mentioned"}</P>
            <p class="mb-3 font-semibold text-gray-500"><i class=" text-black fa-solid fa-dollar-sign"></i> Price: $${items.price?items.price : "Not Avaliable"}</P>
            <hr />
            <div class="flex justify-center gap-5 items-center mt-4">
                <div>
                  <button onclick="likeImage('${items.image}')" type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                  </svg>
                  <span class="sr-only">Icon description</span>
                  </button>
                </div>
                <div><button type="button" onclick="countDown()" class="font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-green-100 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Adopt</button></div>
                <div><button onclick="detailsModal('${items.petId}')" type="button" class="font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-green-100 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button></div>
            </div>
        </div>
        `
        document.getElementById('animal').appendChild(div)
      }, 2000)
    })
    
}

// remove active class function start here now

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("flex");
    for(let btn of buttons){
        btn.classList.remove('bg-green-200');
    }
    
    
}


// all Api data here

const animals = async ()=>{
    const animal = document.getElementById('animal');
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
   
    // Loop through each category and display its name and id
    data.pets.forEach((items) => {
        
        const div = document.createElement('div');
    const loadings = document.getElementById('loadding');
      loadings.style.display = "block";
        setTimeout(() => {
      loadings.style.display = "none";
            div.innerHTML = `
            <div class=" rounded-lg border-2 p-4">
                <span><img class="w-full h-[250px] object-cover rounded-lg mb-5" src="${items.image}" /></span>
                <h2 class="font-bold text-2xl mb-4">${items.category}</h2>
                <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-qrcode"></i> Breed: ${items.breed?items.breed : "Unknown"}</P>
                <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-calendar"></i> Birth: ${items.date_of_birth?items.date_of_birth : "Not available"}</P>
                <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-person-half-dress"></i> Gender: ${items.gender?items.gender : "Not mentioned"}</P>
                <p class="mb-3 font-semibold text-gray-500"><i class=" text-black fa-solid fa-dollar-sign"></i> Price: $${items.price?items.price : "Not Avaliable"}</P>
                <hr />
                <div class="flex justify-center gap-5 items-center mt-4">
                    <div>
                      <button onclick="likeImage('${items.image}')" type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                      </svg>
                      <span class="sr-only">Icon description</span>
                      </button>
                    </div>
                    <div><button type="button" onclick="countDown()" class="font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-green-100 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Adopt</button></div>
                    <div><button onclick="detailsModal('${items.petId}')" type="button" class="font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-green-100 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button></div>
                </div>
            </div>
            `
            animal.appendChild(div)
        }, 2000);
    });
    
}

animals();
categories();

/// sorting all in categories  

const sortData = async()=>{
    document.getElementById('animal').innerHTML="";
    const loadings = document.getElementById('loadding');
    loadings.style.display = "block";
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
        const employee = data.pets;
        employee.sort((a, b) => b.price - a.price);
        employee.forEach((e)=>{
            setTimeout(() => {
                loadings.style.display = "none";
                document.getElementById('animal').innerHTML += `
            <div class=" rounded-lg border-2 p-4">
                <span><img class="w-full h-[250px] object-cover rounded-lg mb-5" src="${e.image}" /></span>
                <h2 class="font-bold text-2xl mb-4">${e.category}</h2>
                <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-qrcode"></i> Breed: ${e.breed?e.breed : "Unknown"}</P>
                <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-calendar"></i> Birth: ${e.date_of_birth?e.date_of_birth : "Not available"}</P>
                <p class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-person-half-dress"></i> Gender: ${e.gender?e.gender : "Not mentioned"}</P>
                <p class="mb-3 font-semibold text-gray-500"><i class=" text-black fa-solid fa-dollar-sign"></i> Price: $${e.price?e.price : "Not Avaliable"}</P>
                <hr />
                <div class="flex justify-center gap-5 items-center mt-4">
                    <div>
                      <button onclick="likeImage('${e.image}')" type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                      </svg>
                      <span class="sr-only">Icon description</span>
                      </button>
                    </div>
                    <div><button type="button" onclick="countDown()" class="font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-green-100 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Adopt</button></div>
                    <div><button onclick="detailsModal('${e.petId}')" type="button" class="font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-green-100 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button></div>
                </div>
            </div>
            `
            }, 2000);
        })
}

// Like buttons functions working start here now

const likeImage = (category) => {
    document.getElementById('likeBoxs').style.display = "block";
    const likeImage = document.getElementById("likeImage");
    likeImage.innerHTML += `
            <img class=" w-full object-cover rounded-lg" src="${category}" alt="Image" />
    `;

    
}
// details buttons functions working start here now

const detailsModal = async (price) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${price}`);
    const data = await response.json();
     my_modal_1.showModal()

     const modal = document.getElementById("my_modal_1");
     modal.innerHTML = 
     `
         <div class="modal-box">
            <span><img class="w-full h-[250px] object-cover rounded-lg mb-5" src="${data.petData.image}" /></span>
            <h2 class="font-bold text-2xl mb-4">${data.petData.category}</h2>
            <span class="font-semibold text-gray-500 mr-5"><i class=" text-black fa-solid fa-qrcode"></i> Breed: ${data.petData.breed?data.petData.breed : "Unknown"}</span>
            <span class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-calendar"></i> Birth: ${data.petData.date_of_birth?data.petData.date_of_birth : "Not available"}</span><br />
            <span class="font-semibold text-gray-500 mr-4"><i class=" text-black fa-solid fa-person-half-dress"></i> Gender: ${data.petData.gender?data.petData.gender : "Not mentioned"}</span>
            <span class="font-semibold text-gray-500"><i class=" text-black fa-solid fa-dollar-sign"></i> Price: $${data.petData.price?data.petData.price : "Not mentioned"}</span>
            <p class="font-semibold text-gray-500 mb-3"><i class="text-black fa-solid fa-bezier-curve"></i> Vaccinated status: ${data.petData.vaccinated_status?data.petData.vaccinated_status : "Not mentioned"}</P>
            <hr />
            <b class="mt-10"> Details Information</b>
            <p class="font-semibold text-gray-500 mb-3"> ${data.petData.pet_details?data.petData.pet_details : "Not mentioned"}</P>
            <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Cancel</button>
            </form>
            </div>
        </div>
     `
     
}

// Countdown timer function start here now 

const countDown = () => {
    let timer = document.getElementById("time").innerText;
    const countdown = setInterval(() => {
     let sum = timer--;
     document.getElementById("time").innerText = sum;
     if (timer < 0) {
        clearInterval(countdown);
        document.getElementById("time").innerHTML = "3";
      }
    }, 1000);

    my_modal_2.showModal()
    setTimeout (() => {
       my_modal_2.close()
    }, 3000)
    
}