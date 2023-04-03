//DARKMODE --- START

document.getElementById("toggle").addEventListener("click", function () {
    document.getElementsByTagName('body')[0].classList.toggle("dark-theme");
    document.querySelector('.post-it-color').classList.toggle("dark-theme");
});

// DARKMODE --- END

// CREATE POST-IT --- START

const postItContainer = document.getElementById('post-it-container');
const createPostItButton = document.getElementById('create-post-it');

let postItId = 0;

createPostItButton.addEventListener('click', createPostIt);

function createPostIt() {
    postItId++;
    const postIt = document.createElement('div');
    postIt.classList.add('post-it');
    postIt.innerHTML = `
        <div class="post-it-header">
            <h3 contenteditable class="post-it-title">Post-It ${postItId}</h3>
            <button class="delete-post-it">&#10005;</button>
        </div>
        <form class="add-todo-form">
            <input type="text" placeholder="Ajouter un élément...">
            <button>+</button>
        </form>
        <ul class="task todo-list">
        </ul>
        </div>
        <div class="post-it-color">
            <button class="yellow"></button>
            <button class="blue"></button>
            <button class="red"></button>
            <button class="green"></button>
        </div>
    `;

    const deleteButton = postIt.querySelector('.delete-post-it');
    deleteButton.addEventListener('click', () => {
        postIt.remove();
    });


    const addTodoForm = postIt.querySelector('.add-todo-form');
addTodoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = addTodoForm.querySelector('input[type="text"]');
    const value = input.value.trim();
    if (value) {
        const listItem = document.createElement('li');
        const taskElement = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        taskElement.contentEditable = true; // Rendre le texte éditable
        taskElement.textContent = value;
        listItem.appendChild(checkbox);
        listItem.appendChild(taskElement);
        addTodoForm.nextElementSibling.appendChild(listItem);
        input.value = '';
    }
});

    const todoList = postIt.querySelector('.todo-list');
    todoList.addEventListener('change', (event) => {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
            const listItem = event.target.parentNode;
            const isDone = event.target.checked;
            if (isDone) {
                listItem.classList.add('done');
            } else {
                listItem.classList.remove('done');
            }
        }
    });

    postItContainer.appendChild(postIt);


    // CHANGE COLOR POST-IT --- START
    
    const yellowButton = postIt.querySelector('.post-it-color .yellow');
    const blueButton = postIt.querySelector('.post-it-color .blue');
    const redButton = postIt.querySelector('.post-it-color .red');
    const greenButton = postIt.querySelector('.post-it-color .green');

    yellowButton.addEventListener('click', () => {
        postIt.style.background = 'linear-gradient(150deg, rgba(212,171,89,1) 0%, rgba(249,230,169,1) 100%)';
    });

    blueButton.addEventListener('click', () => {
        postIt.style.background = 'linear-gradient(150deg, rgba(89,141,212,1) 0%, rgba(169,237,249,1) 100%)';
    });

    redButton.addEventListener('click', () => {
        postIt.style.background = 'linear-gradient(150deg, rgba(185,83,83,1) 0%, rgba(235,159,159,1) 100%)';
    });

    greenButton.addEventListener('click', () => {
        postIt.style.background= 'linear-gradient(150deg, rgba(110,168,75,1) 0%, rgba(179,227,155,1) 100%)';
    });

    // CHANGE COLOR POST-IT --- END

    // OPEN & CLOSED POST-it --- START

    const titleElement = document.createElement('h2');
    let isOpen = false; // Variable pour garder la trace de l'état d'ouverture du post-it

    // ...

    // Afficher le nombre de tâches et l'état d'ouverture dans le titre
    const title = `Post-It ${postItId}`;
    
    postIt.appendChild(titleElement);

    // ...
    const postItHeaderBtn = postIt.querySelector('.post-it-header button');
    const postItAddForm = postIt.querySelector('.add-todo-form');
    const postItColor = postIt.querySelector('.post-it-color');

    postIt.addEventListener('click', (event) => {
        if (event.target !== postIt) {
            return; // Si on clique sur un élément interne, ne rien faire
        }
        isOpen = !isOpen; // Inverser l'état d'ouverture
        if (isOpen) {
            // Afficher la liste de tâches
            postIt.classList.add('openPostIt');
            postItHeaderBtn.style.display = 'flex';
            postItAddForm.style.display = 'flex';
            postItColor.style.display = 'flex';
            todoList.style.display = 'flex';

            postIt.querySelector('.post-it-title').textContent = `${title}`; // Mettre à jour le titre
        } else {
            // Masquer la liste de tâches
            postIt.classList.remove('openPostIt');
            postItHeaderBtn.style.display = 'none';
            postItAddForm.style.display = 'none';
            postItColor.style.display = 'none';
            todoList.style.display = 'none';

            postIt.querySelector('.post-it-title').textContent = `${title} (${todoList.children.length} tâches )`; // Mettre à jour le titre
        }
    });

    // ...

    // Masquer la liste de tâches initialement
    todoList.style.display = 'none';
    // OPEN & CLOSED POST-it --- END
}

// CREATE POST-IT --- END

// FOOTER JS --- START

function openFormContact() {
    const form = document.getElementById('formContact');
    if (form.style.display === 'flex') {
        form.style.display = 'none';
    } else {
        form.style.display = 'flex';   
    }
}

// Checking the contact form
const contact = document.querySelector('.contact');

if (contact) {
    contact.addEventListener('submit', e => {
        // Just to prevent the form to behave normally when submitted
        e.preventDefault();

        // A function to remove all previous error messages and `aria-invalid="true"` attributes, if present
        function removeErrorMessages(element) {
            let label = element.querySelectorAll('label');
            label.forEach(node => {
                let spanError = node.querySelector('.error'),
                    field = node.nextSibling;
                while (field.nodeName === '#text') {
                    field = field.nextSibling; // To ensure the sibling in question is really an `input` or `textarea` element, not a text node
                }
                if (spanError) node.removeChild(spanError);
                field.removeAttribute('aria-invalid');
            });
        }

        // Remove all previous error messages and `aria-invalid="true"` attributes, if present
        removeErrorMessages(contact);

        // Let’s check the fields to see if at least one is empty (to fill with spaces only is not to fill)
        let aFields = contact.querySelectorAll('[required]'),
            emptyFields = new Map();
        aFields.forEach(node => {
            if (!node.value || node.value.match(/^\s+$/m) !== null) emptyFields.set(node, 'Le champ doit être rempli.');

            // An e-mail address is of a certain type, so it has to match the regexp
            if (node.type == 'email' && !node.value.match(/^[-_.0-9a-z]+@[-.0-9a-z]+\.[a-z]+$/i)) emptyFields.set(node, 'L’adresse <span lang="fr">mail</span> n’est pas correctement renseignée.');
        });

        // At least one field is empty
        if (emptyFields.size > 0) {
            for (let [node, errorMessage] of emptyFields) {
                let label = node.parentNode.getElementsByTagName('label')[0],
                    span = document.createElement('span');
                span.className = 'error';
                node.setAttribute('aria-invalid', 'true');
                span.innerHTML = errorMessage;
                label.appendChild(span);
            }
        }

        // All fields are filled
        else {
            // Remove all previous error messages, if present
            removeErrorMessages(contact);

            // Confirm the e-mail sending
            alert('Votre message a été envoyé et sera traité dans les plus brefs délais.');

            // And the great reset of the form (no, this is not a conspiracy theory :-D )
            contact.reset();
        }
    });
}
 

// FOOTER JS --- END