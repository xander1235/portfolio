// code-background.js - Shimmering Code Writing Effect

(function() {
    const canvas = document.getElementById('codeCanvas');
    const ctx = canvas.getContext('2d');
    const mouseGlow = document.querySelector('.mouse-glow');
    
    // Code snippets to display
    const codeSnippets = [
        'const data = await fetch(apiUrl);',
        'function transformData(input) {',
        'class DataPipeline extends Stream {',
        'docker run -d -p 8080:8080 app',
        'SELECT * FROM users WHERE active = true',
        'pipeline.fit_transform(X_train)',
        'const server = express();',
        'async function processStream() {',
        'git commit -m "feat: add new feature"',
        'kubectl apply -f deployment.yaml',
        'import pandas as pd',
        'const result = data.map(item => ',
        'CREATE INDEX idx_user_email ON users',
        'model.compile(optimizer="adam")',
        'app.use(middleware());',
        'def process_batch(batch_size=1000):',
        'COPY users FROM "s3://bucket/data.csv"',
        'return Promise.all(promises);',
        'spark.sql("SELECT * FROM table")',
        'mongoose.connect(mongoUri);'
    ];
    
    // Typing effect settings
    const codeLines = [];
    const maxLines = 15;
    const lineHeight = 30;
    const typingSpeed = 50; // milliseconds per character
    const lineLifetime = 8000; // how long a line stays visible
    const fadeOutDuration = 2000; // fade out animation duration
    
    let mouseX = 0;
    let mouseY = 0;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update mouse glow position
        if (mouseGlow) {
            mouseGlow.style.left = mouseX + 'px';
            mouseGlow.style.top = mouseY + 'px';
        }
    });
    
    // Code line class
    class CodeLine {
        constructor(text, x, y) {
            this.text = text;
            this.x = x;
            this.y = y;
            this.currentLength = 0;
            this.opacity = 1;
            this.createdAt = Date.now();
            this.fadeStarted = false;
            this.targetLength = text.length;
            this.lastTypeTime = Date.now();
            this.isComplete = false;
        }
        
        update() {
            const now = Date.now();
            const age = now - this.createdAt;
            
            // Typing animation
            if (this.currentLength < this.targetLength) {
                if (now - this.lastTypeTime > typingSpeed) {
                    this.currentLength++;
                    this.lastTypeTime = now;
                }
            } else {
                this.isComplete = true;
            }
            
            // Start fading after lifetime
            if (age > lineLifetime && !this.fadeStarted) {
                this.fadeStarted = true;
                this.fadeStartTime = now;
            }
            
            // Fade out animation
            if (this.fadeStarted) {
                const fadeProgress = (now - this.fadeStartTime) / fadeOutDuration;
                this.opacity = Math.max(0, 1 - fadeProgress);
                
                if (this.opacity <= 0) {
                    return false; // Remove this line
                }
            }
            
            return true; // Keep this line
        }
        
        draw(ctx) {
            const displayText = this.text.substring(0, this.currentLength);
            
            // Calculate distance from mouse for shimmer effect
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 300;
            const shimmer = Math.max(0, 1 - distance / maxDistance);
            
            // Set font and color with shimmer effect
            ctx.font = '14px "Fira Code", monospace';
            const baseOpacity = this.opacity * 0.5;
            const shimmerOpacity = this.opacity * (0.5 + shimmer * 0.5);
            
            // Get theme-appropriate color
            const isDark = document.body.classList.contains('dark');
            const baseColor = isDark ? '150, 200, 255' : '110, 69, 226'; // Light blue for dark mode, purple for light
            
            ctx.fillStyle = `rgba(${baseColor}, ${shimmerOpacity})`;
            
            // Add glow effect for text near mouse
            if (shimmer > 0.5) {
                ctx.shadowColor = `rgba(${baseColor}, ${shimmer})`;
                ctx.shadowBlur = 10 * shimmer;
            } else {
                ctx.shadowBlur = 0;
            }
            
            // Draw text
            ctx.fillText(displayText, this.x, this.y);
            
            // Draw cursor if still typing
            if (!this.isComplete && this.currentLength > 0) {
                const cursorX = this.x + ctx.measureText(displayText).width + 2;
                ctx.fillStyle = `rgba(${baseColor}, ${this.opacity * 0.8})`;
                ctx.fillRect(cursorX, this.y - 12, 2, 16);
            }
        }
    }
    
    // Create new code line at mouse position
    function createCodeLine() {
        if (codeLines.length >= maxLines) return;
        
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const margin = 100;
        
        // Position near mouse with some randomness
        const x = mouseX + (Math.random() - 0.5) * 200;
        const y = mouseY + (Math.random() - 0.5) * 200;
        
        // Keep within canvas bounds
        const boundedX = Math.max(margin, Math.min(canvas.width - margin * 2, x));
        const boundedY = Math.max(margin, Math.min(canvas.height - margin, y));
        
        codeLines.push(new CodeLine(snippet, boundedX, boundedY));
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw code lines
        for (let i = codeLines.length - 1; i >= 0; i--) {
            const line = codeLines[i];
            if (!line.update()) {
                codeLines.splice(i, 1);
            } else {
                line.draw(ctx);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Create code lines periodically when mouse moves
    let lastLineCreated = 0;
    document.addEventListener('mousemove', () => {
        const now = Date.now();
        if (now - lastLineCreated > 500) { // Create new line every 500ms max
            createCodeLine();
            lastLineCreated = now;
        }
    });
    
    // Start animation
    animate();
    
    // Create initial lines
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            mouseX = Math.random() * canvas.width;
            mouseY = Math.random() * canvas.height;
            createCodeLine();
        }
    }, 100);
})();