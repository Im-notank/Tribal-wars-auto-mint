(function() {
    console.log("Script started.");

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

        if (endTime && endTime !== "") {
            var endTimeObj = new Date(endTime);
            console.log("Script will end at:", endTimeObj);
            var now = new Date();
            var timeRemaining = endTimeObj.getTime() - now.getTime();
            window.coinMintTimeout = setTimeout(stopInterval, timeRemaining);
        }
    }

    function stopInterval() {
        clearInterval(window.coinMintInterval);
        console.log("Script execution stopped.");
    }

    var version = "1.0.0";
    var intervalInput = prompt("Version: " + version + "\n\nZa tento script platila Padreho mamka\n\nZadajte počet sekúnd medzi razeniami:");
    var intervalDuration = parseInt(intervalInput, 10);
    if (!isNaN(intervalDuration) && intervalDuration > 0) {
        var endTimeInput = prompt("Zadajte čas ukončenia skriptu vo formáte 'HH:MM:SS': (Ak chcete spustiť skript nekonečne, nechajte prázdne)");
        startInterval(intervalDuration, endTimeInput);
    } else {
        console.error("Invalid interval duration. Script aborted.");
    }
})();
