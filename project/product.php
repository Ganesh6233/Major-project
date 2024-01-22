<!DOCTYPE html>
<html>
<body>

<?php
session_start();

// initializing variables
$username = "";
$email    = "";
$errors = array(); 

// connect to the database
$db = mysqli_connect('localhost', 'root', '', 'project');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

$sql = "SELECT id, username, email, img FROM users";
$result = $db->query($sql);

if (!$result) {
    die("Query failed: " . $db->error);
}

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        print "<br> id: ". htmlspecialchars($row["id"]). "<br> - Name: ". htmlspecialchars($row["username"]). "<br> - Email: " . htmlspecialchars($row["email"]) . "<br>";
        print "<img src=\"" . htmlspecialchars($row["img"]) . "\" alt=\"User Image\">";
    }
} else {
    print "0 results";
}

$db->close();   
?> 

</body>
</html>
