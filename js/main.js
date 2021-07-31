const toggleNavClass = () => {
  const scrollPos = window.scrollY;
  const windowHeight = window.innerHeight;
  const header = document.querySelector("#site-header");
  const nav = document.querySelector("nav")
  if ( scrollPos > windowHeight / 3) {
    nav.classList.add("navbar-light");
    nav.classList.remove("navbar-dark");
    header.classList.add("scrolled");
  } else {
    nav.classList.remove("navbar-light");
    nav.classList.add("navbar-dark");
    header.classList.remove("scrolled");
  }
}

window.addEventListener('scroll', () => toggleNavClass());

function loadTeam() {
  fetch('content/team.json')
    .then( response => response.json() )
    .then( data => {
      const members = data['members'];
      const template = document.querySelector(".single-member.template");
      const container = template.parentElement;
      for (let member of members) {
        const element = template.cloneNode(true);
        element.classList.remove('template');

        const img = element.querySelector('.member-photo');
        img.setAttribute('src', '/img/'+member.image);
        img.setAttribute('alt', member.name);

        element.querySelector('.member-name').innerHTML = member.name;
        element.querySelector('.member-title').innerHTML = member.title;
        element.querySelector('.member-class').innerHTML = member.class;
        element.querySelector('.member-course').innerHTML = member.course;
        container.appendChild(element);
      }
    } );
}

function loadEvents() {
  fetch('content/events.json')
    .then( response => response.json() )
    .then( data => {
      const events = data['events'];
      const template = document.querySelector(".single-event.template");
      const container = template.parentElement;
      for (let event of events) {
        const element = template.cloneNode(true);
        element.classList.remove('template');

        const img = element.querySelector('.event-photo');
        img.setAttribute('src', 'img/'+event.photo);
        img.setAttribute('alt', event.description);

        element.querySelector('.event-description').innerHTML = event.description;
        container.appendChild(element);
      }
    } );
}

window.addEventListener('load', () => {
  loadTeam();
  loadEvents();
});
