let currentPage = 0;
const totalPages = 7;
const pageNames = ['Portada', 'Our Moments', 'Things I Love', 'Our Month', 'Our Song', 'Mini Polaroids', 'A Letter for You'];

function startReading() {
    document.querySelector('.magazine-cover').style.display = 'none';
    currentPage = 1;
    showPage(currentPage);
    updateNavigation();
}

function showPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    if (pageNum > 0) document.getElementById(`page${pageNum}`).classList.add('active');
    document.getElementById('pageIndicator').textContent = pageNames[pageNum];
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updateNavigation();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updateNavigation();
    } else if (currentPage === 1) {
        currentPage = 0;
        document.querySelector('.magazine-cover').style.display = 'flex';
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        updateNavigation();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages;

    if (currentPage === 0) {
        nextBtn.textContent = 'Empezar a leer →';
        nextBtn.onclick = startReading;
    } else {
        nextBtn.textContent = currentPage === totalPages ? 'Fin ♡' : 'Siguiente →';
        nextBtn.onclick = nextPage;
    }
}

// Calendario animado
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const daysInMonth = 31;
    const dayHeaders = ['L','M','M','J','V','S','D'];
    dayHeaders.forEach(d => {
        const header = document.createElement('div');
        header.className = 'calendar-day';
        header.style.background = '#ffc107';
        header.style.color = 'white';
        header.style.fontWeight = 'bold';
        header.textContent = d;
        calendar.appendChild(header);
    });

    for(let day=1; day<=daysInMonth; day++){
        const div = document.createElement('div');
        div.className='calendar-day';
        div.textContent=day;
        if(day===30){
            div.classList.add('anniversary-day');
            div.innerHTML=day+'<br>💕';
        }

        div.addEventListener('click', ()=>{
            if(day===30){
                const heart=document.createElement('div');
                heart.className='cute-heart';
                heart.textContent='💖';
                document.body.appendChild(heart);
                setTimeout(()=>heart.remove(),2000);
            }
            document.querySelectorAll('.calendar-day').forEach(el=>{
                el.classList.remove('selected');
            });
            div.classList.add('selected');
        });

        calendar.appendChild(div);
    }
}

// Agregar razón de amor editable
function addLoveReason() {
    const loveList = document.getElementById('loveList');
    const newItem = document.createElement('li');
    newItem.className = 'love-item';
    newItem.contentEditable = true;
    newItem.textContent = 'Escribe aquí otra razón por la que te amo...';
    loveList.appendChild(newItem);
    newItem.focus();
    newItem.addEventListener('focus', function() {
        if(this.textContent==='Escribe aquí otra razón por la que te amo...') this.textContent='';
    });
}

// Video sorpresa (YouTube)
function playSurpriseVideo() {
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.youtube.com/embed/PyoRdu-i0AQ?autoplay=1&rel=0";
    iframe.width="560"; iframe.height="315";
    iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen=true;

    const container=document.createElement('div');
    container.style.position='fixed';
    container.style.top='0'; container.style.left='0';
    container.style.width='100%'; container.style.height='100%';
    container.style.backgroundColor='rgba(0,0,0,0.8)';
    container.style.display='flex'; container.style.alignItems='center'; container.style.justifyContent='center';
    container.style.zIndex='9999';

    const closeBtn=document.createElement('button');
    closeBtn.textContent='Cerrar';
    closeBtn.style.position='absolute';
    closeBtn.style.top='20px'; closeBtn.style.right='20px';
    closeBtn.style.padding='8px 16px'; closeBtn.style.fontSize='1rem';
    closeBtn.style.background='#ff6b9d'; closeBtn.style.color='#fff';
    closeBtn.style.border='none'; closeBtn.style.borderRadius='8px'; closeBtn.style.cursor='pointer';
    closeBtn.addEventListener('click', ()=>container.remove());

    container.appendChild(iframe); container.appendChild(closeBtn);
    document.body.appendChild(container);
}

// Inicialización
document.addEventListener('DOMContentLoaded', function(){
    generateCalendar();
    updateNavigation();

    document.addEventListener('keydown', function(e){
        if(e.key==='ArrowRight' && currentPage<totalPages) nextPage();
        else if(e.key==='ArrowLeft' && currentPage>0) previousPage();
    });

    const surpriseBtn = document.getElementById('surpriseBtn');

if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = "https://www.youtube.com/embed/PyoRdu-i0AQ?autoplay=1&rel=0";
        iframe.width = "560";
        iframe.height = "315";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.backgroundColor = 'rgba(0,0,0,0.8)';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.zIndex = '9999';

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cerrar';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.padding = '8px 16px';
        closeBtn.style.fontSize = '1rem';
        closeBtn.style.background = '#ff6b9d';
        closeBtn.style.color = '#fff';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '8px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => container.remove());

        container.appendChild(iframe);
        container.appendChild(closeBtn);
        document.body.appendChild(container);
    });
}

});