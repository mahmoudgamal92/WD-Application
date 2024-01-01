
Certainly! Below is a modified version of your PHP script that uses dynamic filtering based on the received inputs:

php
Copy code
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once './../../dbcontext/connect.php';

// Define the allowed filter parameters and their corresponding database columns
$allowedFilters = array(
    'prop_type' => 'prop_type',
    'adv_type' => 'adv_type',
    'prop_state' => 'prop_address',
    'min_price' => 'prop_price',
    'max_price' => 'prop_price'
);

// Initialize an empty array to store filter conditions
$filterConditions = array();

// Loop through the allowed filters and add conditions to the array if they are present in the GET request
foreach ($allowedFilters as $param => $column) {
    if (isset($_GET[$param])) {
        // You may want to perform additional validation or sanitation here
        $filterConditions[] = "$column = '" . mysqli_real_escape_string($con, $_GET[$param]) . "'";
    }
}

// Construct the WHERE clause based on the filter conditions
$whereClause = implode(' AND ', $filterConditions);

// Build the SQL query with the dynamically generated WHERE clause
$cmd = "SELECT * FROM properties";

// Add WHERE clause if conditions are present
if (!empty($whereClause)) {
    $cmd .= " WHERE $whereClause";
}

$res = mysqli_query($con, $cmd);

if (mysqli_num_rows($res) > 0) {
    $json_Array = array();

    while ($info = mysqli_fetch_assoc($res)) {
        $item = array();
        $prop_owner = $info['prop_owner'];

        $cmd1 = "SELECT * FROM users WHERE user_token = '$prop_owner'";
        $res1 =  mysqli_query($con, $cmd1);
        $user = mysqli_fetch_assoc($res1);

        $item = array_merge($info, ["user" => $user]);
        array_push($json_Array, $item);
    }

    http_response_code(200);
    echo json_encode(array(
        "success" => true,
        "data" => $json_Array
    ));
    exit();
} else {
    // Set response code - 503 service unavailable
    http_response_code(503);
    // Tell the user
    echo json_encode(array(
        "success" => false,
        "message" => mysqli_error($con)
    ));
}
?>