(function() {
    function executeScript() {
        console.log("Executing script...");

        // Extract the value from the <a> element with id 'coin_mint_fill_max'
        var maxCoinElement = document.getElementById('coin_mint_fill_max');
        if (maxCoinElement) {
            var maxCoinValue = maxCoinElement.textContent.trim();
            var numericValue = parseInt(maxCoinValue.replace(/\D/g, ''), 10);
            console.log("Extracted value: ", numericValue);

            if (!isNaN(numericValue)) {
                // Check if the input element with id 'coin_mint_count' is available
                var coinCountInput = document.getElementById('coin_mint_count');
                if (coinCountInput) {
                    coinCountInput.value = numericValue;
                    console.log("Set value into input field: ", numericValue);

                    // Submit the form via AJAX
                    var form = coinCountInput.closest('form');
                    if (form) {
                        var formData = new FormData(form);
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', form.action, true);
                        xhr.onload = function() {
                            if (xhr.status === 200) {
                                console.log("Coins minted successfully");
                            } else {
                                console.error('Form submission failed: ', xhr.statusText);
                            }
                        };
                        xhr.onerror = function() {
                            console.error('Form submission failed due to a network error.');
                        };
                        xhr.send(formData);
                    } else {
                        console.error('Form element not found');
                    }
                } else {
                    console.log('Not enough resources to mint coins.');
                }
            } else {
                console.error('Extracted value is not a valid number');
            }
        } else {
            console.log('Not enough resources to mint coins.');
        }
    }

    function startInterval(interval, endTime) {
        console.log("Starting interval with duration:", interval, "seconds");
        executeScript();
        window.coinMintInterval = setInterval(executeScript, interval * 1000);
        var now = new Date();
        var endTimeObj = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());
        console.log("Script will end at:", endTimeObj);
        var timeRemaining = endTimeObj.getTime() - now.getTime();
        window.coinMintTimeout = setTimeout(stopInterval, timeRemaining);
    }

    function stopInterval() {
        clearInterval(window.coinMintInterval);
        clearTimeout(window.coinMintTimeout);
        console.log("Script execution stopped.");
    }

    var version = "1.0.0";
    var intervalInput = prompt("Version: " + version + "\n\nZa tento script platila Padreho mamka\n\nZadajte počet sekúnd medzi razeniami:");
    var intervalDuration = parseInt(intervalInput, 10);
    if (!isNaN(intervalDuration) && intervalDuration > 0) {
        var endTimeInput = prompt("Zadajte čas ukončenia skriptu vo formáte 'HH:MM:SS':");
        var splitTime = endTimeInput.split(':');
        if (splitTime.length === 3) {
            var hours = parseInt(splitTime[0], 10);
            var minutes = parseInt(splitTime[1], 10);
            var seconds = parseInt(splitTime[2], 10);
            if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
                var endTime = new Date();
                endTime.setHours(hours, minutes, seconds);
                startInterval(intervalDuration, endTime);
            } else {
                console.error("Invalid end time. Script aborted.");
            }
        } else {
            console.error("Invalid end time format. Script aborted.");
        }
    } else {
        console.error("Invalid interval duration. Script aborted.");
    }
})();
