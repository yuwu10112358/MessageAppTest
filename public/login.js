'use strict';
$(function () {
    $(".loginbutton").click(() => {
        let username = $("#userName").val();
        window.location.href = "/index?username=" + username;
    });
});