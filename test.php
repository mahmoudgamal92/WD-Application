<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once './../../dbcontext/connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $responseData = [];
    $columns = [];
    $values = [];
    $images = array();

    // Loop through all POST data
    foreach ($_POST as $key => $value) {
        $columns[] = $key;
        $values[] = "'$value'";
    }


    if (!empty($_FILES)) {

        foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
            $target = './../../uploads/';
            
            $file_name = $_FILES["images"]["name"][$key];
            $file_tmp = $_FILES["images"]["tmp_name"][$key];
            $uploadDirectory = $target . $file_name;
            if (move_uploaded_file($file_tmp, $uploadDirectory)) {
                // $columns[] = "prop_images";
                // $values[] = "'$fileName'";
                array_push($images, $file_name);
            } else {

                http_response_code(500);
                echo json_encode(
                    array(
                        "success" => false,
                        "message" => "Errorr In Image Upload"
                    )
                );
                exit();
            }
        }



        $gallery = implode(",", $images);
        $columns[] = "prop_images";
        $values[] = "'$gallery'";
    }


    // Construct the SQL query
    $columnList = implode(", ", $columns);
    $valueList = implode(", ", $values);


    $sql = "insert into props ($columnList) values ($valueList)";

    //echo json_encode($valueList);

    // Execute the SQL query
    if (mysqli_query($con, $sql) !== true) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => mysqli_error($con)
        ]);
        exit();
    }

    $con->close();

    // Return a success response
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Data successfully inserted into the database"
    ]);
} else {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method Not Allowed"
    ]);
}
?>