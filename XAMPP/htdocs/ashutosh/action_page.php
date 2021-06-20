<?php 

session_start();

if (isset($_POST['submit'])) {
    // receive all input values from the form
    $_SESSION['rows'] = $_POST['rows']; 
    $_SESSION['columns'] = $_POST['columns'];
}

//echo 'Rows: ' . $rows . ' ' . 'Columns: ' . $columns ; 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700">
    <title>Orthogonal Matrix Checker</title>
</head>
<body>
<form class="form" action="calculation_page.php" method="POST">
    <?php for ($i = 0; $i < $_SESSION['rows']; $i++) {
        for ($j = 0; $j < $_SESSION['columns']; $j++) {
    ?>
    <input class="form_input" type="number" name="<?php echo $i.$j?>" placeholder="Enter <?php echo $i+1?>th row, <?php echo $j+1?>th column element" step="any" required>
    <?php }
    }
    ?>
    <input class="form_submit" type="submit" name="submit-matrix"></input>
  </form>
</body>
</html>