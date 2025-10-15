const loadSettings = () => {

    // Assiggn event listener to the show password button
    document.getElementById('show-password').addEventListener('click', function() {
        const pwdField = document.getElementById('password');
        
        pwdField.type === 'password' ? pwdField.type = 'text' : pwdField.type = 'password';
    });

}