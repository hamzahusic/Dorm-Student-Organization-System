const loadStudentSettings = () => {

    // Assiggn event listener to the show password button
    document.getElementById('show-password-student').addEventListener('click', function() {
        const pwdField = document.getElementById('password-student');
        
        pwdField.type === 'password' ? pwdField.type = 'text' : pwdField.type = 'password';
    });

}