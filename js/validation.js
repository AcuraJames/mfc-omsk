document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('appointmentForm')
  const phoneInput = document.getElementById('phone')
  const inputs = form.querySelectorAll('input, select, textarea')
  console.log(form)
  function createErrorMessage(message) {
    const errorMessage = document.createElement('span')
    errorMessage.className = 'error-message'
    errorMessage.innerText = message
    return errorMessage
  }

  function removeErrorMessages(input) {
    const parent = input.parentElement
    const existingError = parent.querySelector('.error-message')
    if (existingError) {
        parent.removeChild(existingError)
    }
    input.classList.remove('invalid')
  }

  function addErrorMessage(input, message) {
    removeErrorMessages(input)
    const errorMessage = createErrorMessage(message)
    input.parentElement.appendChild(errorMessage)
    input.classList.add('invalid')
  }

  function applyPhoneMask(input) {
    let phone = input.value.replace(/\D/g, '')
    if (!phone) return ''

    const countryCode = '+7'
    let formattedPhone = ''

    if (phone[0] === '9') {
        phone = countryCode + phone
    }
    if (phone[0] === '7' || phone[0] === '8') {
        formattedPhone = countryCode + ' '
    }

    if (phone.length > 1) {
        formattedPhone += '(' + phone.substring(1, 4)
    }
    if (phone.length >= 5) {
        formattedPhone += ') ' + phone.substring(4, 7)
    }
    if (phone.length >= 8) {
        formattedPhone += '-' + phone.substring(7, 9)
    }
    if (phone.length >= 10) {
        formattedPhone += '-' + phone.substring(9, 11)
    }

    input.value = formattedPhone
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      applyPhoneMask(phoneInput)
    })
  }

  form.addEventListener('submit', function(event) {
    let isValid = true

    inputs.forEach(function(input) {
      removeErrorMessages(input)

      if (input.value.trim() === '') {
          addErrorMessage(input, 'Это поле обязательно для заполнения.')
          isValid = false
      } else if (input.id === 'phone' && input.value.length !== 18) {
          addErrorMessage(input, 'Пожалуйста, введите номер телефона в формате +7 (XXX) XXX-XX-XX.')
          isValid = false
      } else if (input.id === 'pin' && !/^\d{5}$/.test(input.value)) {
          addErrorMessage(input, 'Пожалуйста, введите ПИН-код, состоящий из 5 цифр.')
          isValid = false
      }
    })

    if (!isValid) {
      event.preventDefault()
    }
  })
})
