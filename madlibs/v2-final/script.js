(function(){
    'use strict';
    console.log('reading js');

    const pages = document.querySelectorAll('section');
    const madlibStory = document.querySelector('#madlibStory');

    // page 1
    document.querySelector('#next').addEventListener('click',function(event){
        event.preventDefault();

        const name = document.querySelector('#name').value;
        const dogcat = document.querySelector('#dogcat').value;
        const pronoun = document.querySelector('#pronoun').value;

        if (name == '') {
            const name_error = document.querySelector('#name_error');
            name_error.innerHTML = `Please provide a name`;
            document.querySelector('#name').focus();
        } else if (dogcat == '') {
            const dogcat_error = document.querySelector('#dogcat_error');
            dogcat_error.innerHTML = `Please select 'dog' or 'cat'`;
            document.querySelector('#dogcat').focus();
        } else if (pronoun == '') {
            const pronoun_error = document.querySelector('#pronoun_error');
            pronoun_error.innerHTML = `Please select a pronoun`;
            document.querySelector('#pronoun').focus();
        } else {
            pages[0].className = "hidden";
            pages[1].className = "showing";
        } 
    });

    // page 2
    document.querySelector('#back').addEventListener('click',function(event){
        event.preventDefault();
        pages[1].className = "hidden";
        pages[0].className = "showing";
    });

    const form = document.querySelector('#page2 form');
    function submit(event){
        event.preventDefault();
        const name = document.querySelector('#name').value.trim();
        let name_capitalize = name.charAt(0).toUpperCase() + name.slice(1); 
        const dogcat = document.querySelector('#dogcat').value;
        const pronoun = document.querySelector('#pronoun').value;
        const kinship = document.querySelector('#kinship').value.trim();
        const number = document.querySelector('#number').value.trim();
        const store = document.querySelector('#store').value.trim();
        const noun = document.querySelector('#noun').value.trim();
        const dogpage = document.querySelector('#dogpage');
        const catpage = document.querySelector('#catpage');
        const dogMoney = document.querySelector('.dogMoney');
        const catMoney = document.querySelector('.catMoney');

        if (kinship == '') {
            const kinship_error = document.querySelector('#kinship_error');
            kinship_error.innerHTML = `Please enter a kinship term`;
            document.querySelector('#kinship').focus();
        } else if (number == '' || isNaN(number)) {
            const number_error = document.querySelector('#number_error');
            number_error.innerHTML = `Please enter a number`;
            document.querySelector('#number').focus();
        } else if (store == '') {
            const store_error = document.querySelector('#store_error');
            store_error.innerHTML = `Please enter a store name`;
            document.querySelector('#store').focus();
        } else if (noun == '') {
            const noun_error = document.querySelector('#noun_error');
            noun_error.innerHTML = `Please enter a plural noun`;
            document.querySelector('#noun').focus();
        } else {
            if (dogcat =='dog') {
                dogpage.className = "showing";
                catpage.className = "hidden";
                dogMoney.innerHTML = `$${number}`;
            } else if (dogcat == 'cat') {
                dogpage.className = "hidden";
                catpage.className = "showing";
                catMoney.innerHTML = `$${number}`;
            }
            pages[1].className = "hidden";
            pages[2].className = "showing";
            const story = `In Lunar New Year, ${name_capitalize} the ${dogcat} received red envelopes from ${pronoun} ${kinship}. ${name} opened the New Year red envelope and got $${number}! ${name} went to ${store} and purchased ${noun}.`;
            madlibStory.innerHTML = story; 
        }
    }

    form.addEventListener('submit', submit);
    form.addEventListener('keydown', function(event){
        if (event.key == 'Enter') {
            event.preventDefault();
            submit(event);
        }
    });

    // regenerage
    document.querySelector('#regenerate').addEventListener('click',function(event){
        event.preventDefault();
        pages[2].className = "hidden";
        pages[0].className = "showing";
        document.querySelector('#name').value= '';
        document.querySelector('#dogcat').value= '';
        document.querySelector('#pronoun').value= '';
        document.querySelector('#kinship').value= '';
        document.querySelector('#number').value= '';
        document.querySelector('#store').value= '';
        document.querySelector('#noun').value= '';
    });


    function clearError(input, error) {
        document.querySelector(`#${input}`).addEventListener('input', function() {
            document.querySelector(`#${error}`).innerHTML = '';
        });
    }

    function clearSelectError(select, error) {
        document.querySelector(`#${select}`).addEventListener('change', function() {
            document.querySelector(`#${error}`).innerHTML = '';
        });
    }

    clearError('name', 'name_error');
    clearSelectError('dogcat', 'dogcat_error');
    clearSelectError('pronoun', 'pronoun_error');
    clearError('kinship', 'kinship_error');
    clearError('number', 'number_error');
    clearError('store', 'store_error');
    clearError('noun', 'noun_error');

})();