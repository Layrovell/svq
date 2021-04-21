<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { user, questions, session } from 'main/store.js';
  import Loader from 'components/Loader.svelte';
  import Score from 'components/Score.svelte';

  let current = 0;
  let score = 0;
  let showScore = false;
  let ans = [];
  let loading = false;

  onMount(async () => {
    loading = true;
    const topicId = new URLSearchParams(window.location.search).get('topic');
    const result = await axios.get(`http://localhost:3003/questions?topic=${topicId}`);
    questions.set(result.data);
    loading = false;
  });
  
  const handlePrev = () => {
    const prev = current - 1;
    if (prev >= 0) current = prev;
    else console.log('no');
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < $questions.length) current = next;
    else showScore = true;

    if (next === $questions.length) {
        axios.post('http://localhost:3003/endtest', { 
          end: new Date(),
          score: score,
          id_runs: $session,
        })
        .then((response) => { console.log(response)})
    }
  };

  const handleAnswerClick = (isCorrect, userId, queId, ansId) => {
    if (isCorrect) score += 1;
    axios.post('http://localhost:3003/results', {
        user_id: userId,
        question_id: queId,
        answer_id: ansId,
      })
      .then((response) => { console.log(response) });
  };
</script>

<svelte:head>
  <title>Quiz</title>
</svelte:head>

<section>
  {#if showScore}
    <Score {score} length={$questions.length} />
  {:else if $questions.length}

    {#if loading}
      <Loader />
    {:else}
      <div>Question {current + 1} / {$questions.length}</div>
      <div class="question">{$questions[current].questionText}</div>
      <div class="container">
        
        {#each $questions[current].answerOptions as answers, i}
          <div class="item">
            <input
              type="radio"
              bind:group={ans[current]}
              value={answers.answerText}
              id={i}
              on:click={() => {
                handleAnswerClick(
                  answers.is_correct,
                  $user.id,
                  $questions[current].id,
                  answers.id
                );
              }}
            />
            <label for={i}>{i + 1}: {answers.answerText}</label>
          </div>
        {/each}
        
      </div>
      <button on:click={() => handlePrev()}>prev</button>
      <button on:click={() => handleNext()}>next </button>
    {/if}

  {/if}
</section>

<style>
  section {
    border: 1px solid lightgray;
    padding: 20px;
  }
  .question {
    font-weight: bold;
    font-size: 1.5em;
    margin: 10px 0;
  }
  .container {
    margin: 20px 20px 20px 0;
  }
  .item {
    display: flex;
    margin: 10px 0;
  }
  [type='radio']:checked,
  [type='radio']:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type='radio']:checked + label,
  [type='radio']:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
  }
  [type='radio']:checked + label:before,
  [type='radio']:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }
  [type='radio']:checked + label:after,
  [type='radio']:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #7f00bc;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type='radio']:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  [type='radio']:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
</style>
