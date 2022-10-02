let submit = document.getElementById('submit');

function ValidateEmail(inputText)
{
var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.value.match(email))
{
alert("Вы успешно зарегистрировались");
document.form1.text1.focus();
}
else
{
alert("Ошибка");
document.form1.text1.focus();
}
}