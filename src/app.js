document.addEventListener('DOMContentLoaded', () => {
    const renderContacts = () => {
        const storage = window.localStorage
        const contacts = JSON.parse(storage.getItem('contacts'))
        
        let div = document.querySelector('.contact-list')
      
        if (contacts && contacts.length > 0) {
          div.innerHTML = ''
      
          const ul = document.createElement('ul')
      
          contacts.forEach(contact => {
            let pos = contacts.indexOf(contact)
            let li = document.createElement('li')
            li.innerHTML = `
              <div class="card">
                <div class="image">
                  <img src="https://ca-address-book.herokuapp.com/images/pine.jpg" width="64", height="64" />
                </div>
                <div class="remove">
                    <button id="remove-btn-${pos}" class="remove-contact">Remove ${ contact.name }</button>
                </div>
                <div class="content">
                  <h1>${ contact.name }</h1>
                  <h2>${ contact.company }</h2>
                  <p>${ contact.notes }</p> 
                  ${ contact.email } | 
                  <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
                </div>
              </div>
           `
            ul.appendChild(li)
          })
      
          div.appendChild(ul) 
        } else { 
          div.innerHTML = '<p>You have no contacts in your address book</p>' 
        }
    }
    renderContacts()

    const addContactForm = document.querySelector('.new-contact-form')

    addContactForm.addEventListener('submit', event => {
        event.preventDefault()
        const storage = window.localStorage

        const {
            name,
            email,
            phone,
            company,
            notes,
            twitter,
        } = addContactForm.elements

        const contact = {
            id: Date.now(),
            name: name.value,
            email: email.value,
            phone: phone.value,
            company: company.value,
            notes: notes.value,
            twitter: twitter.value,
        }

        console.log(`Saving the following contact: ${JSON.stringify(contact)}`)
        let contacts = JSON.parse(storage.getItem('contacts')) || []
        contacts.push(contact)
        storage.setItem('contacts', JSON.stringify(contacts))
        document.getElementById('contact-form').reset()
        renderContacts()
        location.reload()
    })

    document.querySelector('ul').addEventListener('click', event => {
        const storage = window.localStorage
        const clickedButton = event.target.id
        const contactNumber = clickedButton.replace('remove-btn-', '')
        const contacts = JSON.parse(storage.getItem('contacts'))
        const removeContact = confirm(`Are you sure you want to remove ${contacts[contactNumber].name}?`)
        if (removeContact == true) {
            contacts.splice(contacts[contactNumber], 1)
            storage.setItem('contacts', JSON.stringify(contacts))
            window.location.reload()
        }
    })
})
