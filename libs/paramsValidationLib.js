let email = (email) => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(email.match(emailRegex)){
        return email
    }
    else 
    {
        return false
    }
    }

    let password = (password) => {
        let passRegex = /^[A-Za-z0-9]\w{7,}$/

        if(password.match(passRegex)){
            return password
        }
        else{
            return false
        }
    }

    module.exports = {
        Email: email,
        Password: password
    }