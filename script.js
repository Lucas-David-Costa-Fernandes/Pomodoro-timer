let action = document.getElementById('action');
let Break = document.getElementById('Break');
let reps = document.getElementById('reps');
let seconds;

function start(){
    if(action.value == 0){
        document.getElementById('errorAction').innerHTML = "Please input working time!"
        action.focus()
    } else if(Break.value == 0){
        document.getElementById('errorBreak').innerHTML = "Please imput break time!"
        Break.focus()
    } else if(reps.value == 0){
        document.getElementById('errorReps').innerHTML = "Please imput amount of repetitions!"
        reps.focus()
    } else {
        localStorage.setItem('action', String(action.value))
        localStorage.setItem('Break', String(Break.value))
        localStorage.setItem('reps', String(reps.value))
           
        document.getElementById('timer').style.setProperty('display', 'block')
        document.getElementById('config').style.setProperty('display', 'none')
        document.getElementById('timerActive').style.setProperty('display', 'none');
       
        actionStatus()
        
    }
}




function actionStatus(){

    
    var repsValue = Number(localStorage.getItem('reps'))
    
    

  
    console.log(repsValue)



    if(repsValue >= 1){
        document.getElementById('tittleReps').innerHTML = `${repsValue} Reps left`
    } if(repsValue < 1){
        document.getElementById('tittleReps').innerHTML = `${repsValue} Reps left. Last one!!!`
    }

    let tittle = document.getElementById('timerActive')
    document.getElementById('timerActive').style.setProperty('display', 'block')
    tittle.innerHTML = "Action Time!"

    let min = Number(localStorage.getItem('action'))
    min -= 1
    seconds = 59

    document.getElementById('minutesOk').innerHTML = min
    document.getElementById('secondsOk').innerHTML = seconds
    
    var minInterval = setInterval(minTimer,60000)
    var secInterval = setInterval(secTimer, 1000)
    
    function minTimer(){
        min -= 1
        document.getElementById('minutesOk').innerHTML = min
    }

    function secTimer(){
        seconds -= 1
        document.getElementById('secondsOk').innerHTML = seconds

        if(seconds <= 0){
            if(min <= 0 ){
                if (repsValue <= 0){
                    clearInterval(minInterval)
                    clearInterval(secInterval)
                    localStorage.clear

                    document.getElementById('end').style.setProperty('display', 'block');
                    document.getElementById('timer').style.setProperty('display', 'none')
                }
                clearInterval(minInterval)
                clearInterval(secInterval)

                BreakTime()
            }

            seconds = 60
        }
    }

}

function BreakTime(){
    
    let tittle = document.getElementById('timerActive')
    tittle.innerHTML = "Break Time!"

    let minBreak = Number(localStorage.getItem('Break'))
    minBreak -= 1
    seconds = 59

    document.getElementById('minutesOk').innerHTML = minBreak
    document.getElementById('secondsOk').innerHTML = seconds
    
    var minInterval = setInterval(minTimer,60000)
    var secInterval = setInterval(secTimer, 1000)

    function minTimer(){
        minBreak -= 1
        document.getElementById('minutesOk').innerHTML = minBreak
    }

    function secTimer(){
        seconds -= 1
        document.getElementById('secondsOk').innerHTML = seconds

        if(seconds <= 0){
            if(minBreak <= 0){
                reps = Number(localStorage.getItem('reps'))
                reps = reps - 1
                localStorage.setItem('reps',String(reps))

                clearInterval(minInterval)
                clearInterval(secInterval)
                
                actionStatus()
            }

            seconds = 60
        }
    }
}