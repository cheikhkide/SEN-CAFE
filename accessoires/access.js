
        // ⚠️ IMPORTANT: Remplacez cette URL par votre URL Google Apps Script
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbziF2aNqRanM2czqExjt5x5Nez_j_Daiv5YVITZDGCpmhw0B3iq_tqy5_oRoRY5Wk4P/exec';

        let currentProduct = '';
        let currentPrice = 0;
        let quantity = 1;
        let orderModal;

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
        });

        // Open order modal
        function openOrderModal(productName, price) {
            currentProduct = productName;
            currentPrice = price;
            quantity = 1;
            
            document.getElementById('modalProductName').textContent = `Commander ${productName}`;
            document.getElementById('quantityDisplay').textContent = quantity;
            document.getElementById('orderForm').reset();
            
            orderModal.show();
        }

        // Quantity controls
        function increaseQuantity() {
            quantity++;
            document.getElementById('quantityDisplay').textContent = quantity;
        }

        function decreaseQuantity() {
            if (quantity > 1) {
                quantity--;
                document.getElementById('quantityDisplay').textContent = quantity;
            }
        }

        // Handle form submission
        document.getElementById('orderForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const lastName = document.getElementById('lastName').value.trim();
            const firstName = document.getElementById('firstName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!lastName || !firstName || !phone) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            // Prepare data
            const orderData = {
                nom: lastName,
                prenom: firstName,
                telephone: phone,
                produit: currentProduct,
                prix: currentPrice,
                quantite: quantity,
                total: currentPrice * quantity,
                date: new Date().toLocaleString('fr-FR')
            };

            // Show loading on button
            const submitBtn = e.target.querySelector('.btn-submit-order');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            try {
                // Send to Google Sheets
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });

                // Close modal
                orderModal.hide();
                
                // Show success message
                showSuccessMessage();
                
                // Reset form
                document.getElementById('orderForm').reset();
                quantity = 1;

            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de l\'envoi de la commande. Veuillez réessayer.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

        // Show success message
        function showSuccessMessage() {
            const message = document.getElementById('successMessage');
            message.classList.add('show');
            setTimeout(() => {
                message.classList.remove('show');
            }, 3000);
        }
    