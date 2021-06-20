<?php

session_start();

if (!isset($_SESSION['rows']) || !isset($_SESSION['columns'])) {
    session_destroy();
    unset($_SESSION['rows']);
    unset($_SESSION['columns']);
    header("location: index.php");
}

if (isset($_POST['submit-matrix'])) {
    // receive all input values from the form
    $rows = $_SESSION['rows'];
    $columns = $_SESSION['columns'];

    for ($i = 0; $i < $rows; $i++) {
        for ($j = 0; $j < $columns; $j++) {
            $matrix[$i][$j] = $_POST[$i.$j];
        }
    }


    /*
    for ($i = 0; $i < $rows; $i++) {
        for ($j = 0; $j < $columns; $j++) {
            echo $matrix[$i][$j].' ';
        }
    }*/

    for ($i = 0; $i < $rows ; $i++)  {
        for ($j = 0; $j < $columns; $j++) {
        $transpose[$j][$i] = $matrix[$i][$j];
        }
    }

    $sum = 0;
    for ($c = 0; $c < $rows; $c++)
    {
        for ($d = 0; $d < $columns; $d++)
        {
        for ($k = 0; $k < $columns; $k++)
        {
            $sum = $sum + $matrix[$c][$k]*$transpose[$k][$d];
        }

        $product[$c][$d] = $sum;
        $sum = 0;
        }
    }

  for ($c = 0; $c < $rows; $c++)
  {
    for ($d = 0; $d < $rows; $d++)
    {
      if ($c == $d)
      {
        if ($product[$c][$d] != 1)
          break;
      }
      else
      {
        if ($product[$c][$d] != 0)
          break;
      }
    }
    if ($d != $rows)
      break;
  }

  if ($c != $rows){
    echo "The matrix isn't orthogonal.\n";
  }
  else{
    echo "The matrix is orthogonal.\n";
  }

}

if (isset($_GET['reset'])) {
    session_destroy();
    unset($_SESSION['rows']);
    unset($_SESSION['columns']);
    header("location: index.php");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orthogonal Matrix Checker</title>
</head>
<body>
<p><a href="calculation_page.php?reset='1'" style="color: red;">Reset</a> </p>
</body>
</html>