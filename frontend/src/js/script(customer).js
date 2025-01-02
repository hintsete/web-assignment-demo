
document.addEventListener("DOMContentLoaded", () => {
    const orderButtons = document.querySelectorAll(".order-button");
    const orderSummaryElement = document.querySelector(".order-summary ol");
    const totalPriceElement = document.querySelector(".total_price");
    const placeholderElement = document.querySelector(".placeholder");
    let totalPrice = 0; // To keep track of the overall total

    
    placeholderElement.innerText = "You haven't made any order yet. Add menu items.";

    placeholderElement.style.display = "block"; // Show placeholder initially
    orderButtons.forEach(button => {
        button.addEventListener("click", () => {
            const menuCard = button.closest(".menu-card");
            const dishName = menuCard.querySelector("h3").innerText;
            const price = parseFloat(menuCard.querySelector(".price span").innerText);
            const quantity = parseInt(menuCard.querySelector("input[type='number']").value);

            if (quantity > 0) {
                const itemTotal = price * quantity;
                totalPrice += itemTotal;

                // Create a new list item
                const listItem = document.createElement("li");
                listItem.innerHTML = `${dishName} (${quantity}) - <span>${itemTotal.toFixed(2)} ETB</span> <span class="delete-button">X</span>`;

                // Add the new item to the order summary
                orderSummaryElement.appendChild(listItem);
                placeholderElement.style.display = "none"; // Hide placeholder

                // Update total price displayed
                totalPriceElement.innerHTML = `<strong>Total:</strong> ${totalPrice.toFixed(2)} ETB`;

                // Clear the input field
                menuCard.querySelector("input[type='number']").value = 0;

                // Add event listener to the delete button
                const deleteButton = listItem.querySelector(".delete-button");
                deleteButton.addEventListener("click", () => {
                    totalPrice -= itemTotal; // Subtract the item's total from the overall total
                    orderSummaryElement.removeChild(listItem); // Remove the item from the summary

                    // Update total price displayed
                    totalPriceElement.innerHTML = `<strong>Total:</strong> ${totalPrice.toFixed(2)} ETB`;

                    // Check if the order summary is empty
                    if (orderSummaryElement.children.length === 0) {
                        placeholderElement.style.display = "block"; // Show placeholder
                    }
                });
            }
        });
    });

    // Confirm button logic
    document.getElementById('confirm-button').addEventListener('click', function() {
        // Check if there is an order
        if (totalPrice > 0) {
            // Update the confirmation message
            document.getElementById('confirmation-text').innerText = `Your order has been confirmed successfully!\nTotal: ${totalPrice.toFixed(2)} ETB`;

            // Show the confirmation message and overlay
            document.getElementById('confirmation-message').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }
    });

    // Close the confirmation message
    document.getElementById('close-button').addEventListener('click', function() {
        document.getElementById('confirmation-message').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });
});