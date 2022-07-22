const submit=document.getElementById('submit');
submit.addEventListener('click',answer);

function answer(){
    var A= new Array();
    for (let i=0;i<81;i++){
                    //taking the input values in a 1D array
                    A[i]=Number(document.getElementsByTagName('input')[i].value);
    }
    //Giving output a different color        
    for(let i=0;i<81;i++){
        if(A[i]==0){
            document.getElementsByTagName('input')[i].style.color='rgb(89, 89, 231)';
        }
    }
        //converting 1D input array to a 2D array/board
        var board=[];
        while(A.length>0){
            board.push(A.splice(0,9));
         }
            
    let N = board.length;

    let inputValid= checkInput(board);
    
    if(inputValid){
  
    if (solveSudoku(board, N))
    {
        
        print(board);
    }
    else
    {
        alert('No Solution');
    }
    
    }
}

function isZero(board){
    let sum=0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
        sum=sum+board[i][j];
    }
}
    return sum==0;
}

function checkInput(board){
    //check if there is no input
    if(isZero(board)){
        document.getElementById('alert-msg').style.display='block';
        return false
    }
    document.getElementById('alert-msg').style.display='none';
    return true;
}

function isSafe(board, row, col, value)
{
	
	//check if row has the value already
	for(let j = 0; j < board.length; j++)
	{	
		if (board[row][j] == value)
		{
			return false;
		}
	}

	//check if column has the value already
	for(let i = 0; i < board.length; i++)
	{	
		if (board[i][col] == value)
		{
			return false;
		}
	}

	//check if the 3*3 matrix has the value already
	let sqrt = Math.floor(Math.sqrt(board.length));
	let boxRowStart = row - row % sqrt;
	let boxColStart = col - col % sqrt;

	for(let i= boxRowStart;i<boxRowStart+sqrt;i++)
	{
		for(let j = boxColStart;j< boxColStart+sqrt;j++)
		{
			if (board[i][j] == value)
			{
				return false;
			}
		}
	}

	// If none of above conditions satisfied, it's safe
	return true;
}

function solveSudoku(board, n)
{
	let row = -1;
	let col = -1;
	let isEmpty = true;
	for(let i = 0; i < n; i++)
	{
		for(let j = 0; j < n; j++)
		{
			if (board[i][j] == 0)
			{
				row = i;
				col = j;

				// We still have some remaining
				// missing values in Sudoku
				isEmpty = false;
				break;
			}
		}
		if (!isEmpty)
		{
			break;
		}
	}

	// No empty space left
	if (isEmpty)
	{
		return true;
	}

	// Else for each-row backtrack
	for(let num = 1; num <= n; num++)
	{
		if (isSafe(board, row, col, num))
		{
			board[row][col] = num;
			if (solveSudoku(board, n))
			{
				return true;
			}
			else
			{
	
				board[row][col] = 0;
			}
		}
	}
	return false;
}

function print(board){
    //changing 2D back to 1D
    const output = new Array();
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            output.push(board[i][j]);
        }
    }
   

    for(let k=0;k<81;k++){
    document.getElementsByTagName('input')[k].value=output[k];
    }
}

