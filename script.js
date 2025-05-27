// Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // FAQ toggle
        document.querySelectorAll('.faq-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('i');
                
                content.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        });

        // Loan form steps
        const formSteps = document.querySelectorAll('.form-step');
        const nextButtons = document.querySelectorAll('.next-step');
        const prevButtons = document.querySelectorAll('.prev-step');
        const progressBar = document.querySelector('.progress-bar');
        const loanForm = document.getElementById('loan-form');
        const successMessage = document.getElementById('success-message');

        let currentStep = 1;
        const totalSteps = 4;

        function updateProgress() {
            const progress = (currentStep / totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Update step indicators
            document.querySelectorAll('[data-step]').forEach(step => {
                step.classList.remove('active');
            });
            document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        }

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateProgress();
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateProgress();
                }
            });
        });

        loanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loanForm.style.display = 'none';
            successMessage.classList.remove('hidden');
        });

        // Simulate loan calculation
        const amountSlider = document.querySelector('input[type="range"]:first-of-type');
        const durationSlider = document.querySelector('input[type="range"]:last-of-type');
        
        function updateLoanEstimation() {
            const amount = parseInt(amountSlider.value);
            const duration = parseInt(durationSlider.value);
            
            // Simple estimation formula (for demo purposes)
            const rate = 2.5 + (amount / 100000) + (duration / 100);
            const monthlyPayment = (amount * (1 + rate/100)) / duration;
            
            document.querySelector('.font-bold.text-lg:first-of-type').textContent = `${amount.toLocaleString()}€`;
            document.querySelector('.font-bold.text-lg:last-of-type').textContent = `${duration} mois`;
            document.querySelector('.bg-white.bg-opacity-20 .font-bold:first-of-type').textContent = `${monthlyPayment.toFixed(0)}€`;
            document.querySelector('.bg-white.bg-opacity-20 .font-bold:last-of-type').textContent = `${rate.toFixed(1)}%`;
        }
        
        amountSlider.addEventListener('input', updateLoanEstimation);
        durationSlider.addEventListener('input', updateLoanEstimation);
        
        // Initialize
        updateLoanEstimation();