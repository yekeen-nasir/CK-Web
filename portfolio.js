        // Three.js animated background
        let scene, camera, renderer, particles;

        function initBackground() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Create particles
            const geometry = new THREE.BufferGeometry();
            const particleCount = 1000;
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                color: 0x64ffda,
                size: 0.5,
                transparent: true,
                opacity: 0.6
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            camera.position.z = 50;

            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        }

        // Scroll animations
        function handleScroll() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Animate elements on scroll
            const elements = document.querySelectorAll('.scroll-animate');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Smooth scrolling for navigation links
        function smoothScroll() {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Mobile menu toggle
        function initMobileMenu() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const navLinks = document.querySelector('.nav-links');
            
            mobileMenu.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(31, 41, 55, 0.95)';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '1rem';
                navLinks.style.borderRadius = '0 0 10px 10px';
            });
        }

        // Project card interactions
        function initProjectCards() {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                    this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = 'none';
                });
            });
        }

        // Typing animation for hero text
        function initTypingAnimation() {
            const subtitle = document.querySelector('.hero .subtitle');
            const text = "Full Stack Developer | Python Programmer | AI Generalist";
            let index = 0;
            
            subtitle.textContent = '';
            
            function typeWriter() {
                if (index < text.length) {
                    subtitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }

        // Particle mouse interaction
        function initMouseInteraction() {
            let mouse = { x: 0, y: 0 };
            
            document.addEventListener('mousemove', (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                
                if (particles) {
                    particles.rotation.x += mouse.y * 0.0001;
                    particles.rotation.y += mouse.x * 0.0001;
                }
            });
        }

        // Resize handler
        function handleResize() {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initBackground();
            smoothScroll();
            initMobileMenu();
            initProjectCards();
            initTypingAnimation();
            initMouseInteraction();
            
            // Initial scroll check
            handleScroll();
            
            // Add scroll listener
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize);
            
            // Add loading animation to elements
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.1}s`;
            });
        });

        // Performance optimization
        let ticking = false;
        
        function updateOnScroll() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
                setTimeout(() => { ticking = false; }, 16);
            }
        }
        
        // Replace the regular scroll listener with the optimized one
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', updateOnScroll);