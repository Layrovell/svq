<script>
  import questions from "data/questions.json";
  import Score from "components/Score.svelte";

  let current = 0;
  let score = 0;
  let showScore = false;
  let length = questions.length;
  let res = [{'que': 'res'}];

  const handleNext = () => {
    const next = current + 1;
    if (next < length) current = next;
    else showScore = true;

    console.warn(ans);
  };

  const handlePrev = () => {
    const prev = current - 1;
    if (prev >= 0) current = prev;
    else console.log("no no no!");
  };

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect === true) score += 1;
    // handleNext();
  };

  let ans = [];
</script>

<section>
  {#if showScore}
    <Score {score} {length} />
  {:else}
    <div>Question {current + 1} / {length}</div>
    <div class="question">{questions[current].questionText}</div>
    <div class="container">
      {#each questions[current].answerOptions as answers, i}
        <label>
          <input
            type="radio"
            bind:group={ans}
            value={answers.answerText}
            on:click={() => {
              handleAnswerClick(answers.isCorrect);
              res.push({'question': ans});
              console.warn(res);
              console.warn(ans);
            }}
          />
          {i + 1}: {answers.answerText}
        </label>
      {/each}
    </div>
    <button on:click={() => handlePrev()}>prev</button>
    <button on:click={() => handleNext()}>next </button>
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
  label {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
  }
  input {
    margin: 0 10px 0 0;
    padding: 0 10px;
    transition: all 0.4s ease-in-out;
  }
  .container {
    margin: 20px 20px 20px 0;
  }
</style>
