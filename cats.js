const apiKey = '';  // The Cat APIから取得したAPIキーをここに入力
const breedListUrl = 'https://api.thecatapi.com/v1/breeds';
let questionCount = 1;  // 問題数をカウントする変数
// プレースホルダー画像
const placeholderImage = 'https://i.ytimg.com/vi/v3vw7fhxrW0/maxresdefault.jpg';

// クイズを初期化する関数
function initializeQuiz() {
    // プレースホルダー画像を表示
    document.getElementById('catImage').src = placeholderImage;

    // 問題番号を表示
    document.getElementById('questionNumber').innerText = `第 ${questionCount} 問`;

    fetch(breedListUrl, {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(breeds => {
        const randomBreeds = getRandomBreeds(breeds, 4); // 4つの品種をランダムに選択
        const correctBreed = randomBreeds[0]; // 正解の品種を選択

        // 猫の画像を取得
        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${correctBreed.id}`, {
            headers: {
                'x-api-key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0 && data[0].url) {
                const catImageUrl = data[0].url;
                document.getElementById('catImage').src = catImageUrl;  // 取得した画像に置き換え
                document.getElementById('question').innerText = `このネコの品種は何ですか？(不正解の選択が赤く表示されていきます)`;

                // 選択肢を表示
                displayChoices(randomBreeds, correctBreed);
            } else {
                console.error('画像が見つかりませんでした。');
                document.getElementById('question').innerText = `画像が見つかりませんでした。再度、読み込んでください。`;
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching breeds:', error);
    });
}

// ランダムに品種を選ぶ関数
function getRandomBreeds(breeds, num) {
    const shuffled = breeds.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// 選択肢を表示する関数
function displayChoices(breeds, correctBreed) {
    const choicesDiv = document.getElementById('choices');
    const descriptionDiv = document.getElementById('description');  // 説明を表示する場所
    const resultDiv = document.getElementById('result');  // 正解・不正解を表示する場所
    choicesDiv.innerHTML = '';  // 既存の選択肢をクリア
    descriptionDiv.innerText = '';  // 既存の説明をクリア
    resultDiv.innerText = '';  // 既存の結果をクリア

    breeds.forEach(breed => {
        const button = document.createElement('button');
        button.innerText = breed.name;  // 英語の品種名を表示
        button.onclick = () => {
            if (breed.id === correctBreed.id) {
                // 正解の処理
                resultDiv.innerText = "正解です！";  // 正解メッセージを表示
                descriptionDiv.innerText = correctBreed.description;  // 正解時に説明を表示
                resultDiv.style.color = 'green';  // 正解の場合、緑色に変更
                button.style.backgroundColor = 'lightgreen';  // 正解したボタンの色を変更
            } else {
                // 不正解の処理
                button.disabled = true;  // 不正解のボタンを無効化
                resultDiv.innerText = "残念、不正解です...。";  // 不正解メッセージを表示
                resultDiv.style.color = 'red';  // 不正解の場合、赤色に変更
                button.style.backgroundColor = 'lightcoral';  // 不正解したボタンの色を変更
            }
        };
        choicesDiv.appendChild(button);
    });
}

// 次の問題ボタンを押したときに、クイズをリセットして次の問題を表示する
document.getElementById('nextButton').onclick = function() {
    questionCount++;  // 問題数をカウントアップ
    initializeQuiz();  // 次の問題を表示
};

// 最初のクイズの初期化を呼び出す
initializeQuiz();
