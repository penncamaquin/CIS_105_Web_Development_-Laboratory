$(document).ready(function () {
    const $searchBtn = $('#search-btn');
    const $inputField = $('#name-input');
    const $nameScreen = $('#name-screen');
    const $imageScreen = $('#image-screen');
    const $aboutScreen = $('#about-screen');
    const $typeScreen = $('#type-screen');
    const $idScreen = $('#id-screen');
    const $rightButton = $('.right-nav-button');
    const $leftButton = $('.left-nav-button');

    let current = 1;

    function getPokemonData(pokemon) {
        if (!pokemon) return;

        // Now calls our Express backend instead of PokeAPI directly
        $.ajax({
            url: `/api/pokemon/${pokemon}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (!data.id) return;
                current = data.id;

                $imageScreen.css(
                    'background-image',
                    `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif')`
                );
                $imageScreen.animate({ right: -120 }, 120);
                $imageScreen.animate({ right: 0 }, 120);

                $nameScreen.text(data.name);
                $typeScreen.text(data.types[0].type.name);
                $idScreen.text(`#${data.id}`);
                $aboutScreen.text(
                    `Height: ${data.height * 10}cm Weight: ${data.weight / 10}kg Ability: ${data.abilities[0].ability.name}`
                );
                $inputField.val('');
            },
            error: function () {
                $nameScreen.text('???');
                $aboutScreen.text('Pokemon not found!');
            }
        });
    }

    $inputField.on('keydown', function (event) {
        if (event.key === 'Enter') $searchBtn.click();
    });
    $searchBtn.on('click', function () {
        getPokemonData($inputField.val().toLowerCase().trim());
    });
    $rightButton.on('click', function () {
        getPokemonData(current + 1);
    });
    $leftButton.on('click', function () {
        if (current <= 1) return;
        getPokemonData(current - 1);
    });
    $(document).on('keydown', function (event) {
        if (event.key === 'ArrowRight') {
            $rightButton.click();
        } else if (event.key === 'ArrowLeft') {
            $leftButton.click();
        }
    });
});
