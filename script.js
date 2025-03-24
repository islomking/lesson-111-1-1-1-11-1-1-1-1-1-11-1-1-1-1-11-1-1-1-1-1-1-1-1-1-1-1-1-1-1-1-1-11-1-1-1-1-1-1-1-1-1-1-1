const userList = document.getElementById("userList");
        const loader = document.querySelector(".loader");
        const searchInput = document.getElementById("search");
        const sortOptions = document.getElementById("sortOptions");
        let users = [];

        async function fetchUsers() {
            loader.style.display = "block";
            const response = await fetch("https://randomuser.me/api/?results=100");
            const data = await response.json();
            users = data.results.map(user => ({
                name: `${user.name.first} ${user.name.last}`,
                age: user.dob.age,
                email: user.email,
                phone: user.phone,
                picture: user.picture.medium,
                location: `${user.location.city}, ${user.location.country}`
            }));
            loader.style.display = "none";
            displayUsers(users);
        }

        function displayUsers(userArray) {
            userList.innerHTML = "";
            userArray.forEach(user => {
                userList.innerHTML += `
                    <div class="user-card">
                        <img src="${user.picture}" alt="User Picture">
                        <h3>${user.name}</h3>
                        <p>Возраст: ${user.age}</p>
                        <p>Email: ${user.email}</p>
                        <p>Телефон: ${user.phone}</p>
                        <p>Местоположение: ${user.location}</p>
                    </div>
                `;
            });
        }

        searchInput.addEventListener("input", () => {
            const searchText = searchInput.value.toLowerCase();
            const filteredUsers = users.filter(user => 
                user.name.toLowerCase().includes(searchText)
            );
            displayUsers(filteredUsers);
        });

        sortOptions.addEventListener("change", () => {
            const sortBy = sortOptions.value;
            users.sort((a, b) => 
                sortBy === "name" ? a.name.localeCompare(b.name) : a.age - b.age
            );
            displayUsers(users);
        });

        fetchUsers();