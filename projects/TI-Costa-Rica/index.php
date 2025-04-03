<!DOCTYPE html> 
<html lang="es"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
    <title>Empresas TI CR</title> 
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
<link href="css/estilo.css" rel="stylesheet" type="text/css">
<link rel="icon" href="eye1.ico" type="image/gif" sizes="16x16">
</head>   
<body> 
    <header>
          <h1>Estadisticas Empresas TI CR</h1>
    </header>
   <main>
         <canvas id="likesChart" width="400" height="400"></canvas>
   </main>
   <footer>
         <p>Data from Facebook</p>
  </footer>
  
<?php 
require('simple_html_dom.php'); 
  $arrContextOptions=array(
    "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
    ),
);  
?>
<?php 
$url = array("https://www.facebook.com/CEOELORBE/","https://es-la.facebook.com/conzultek/","https://www.facebook.com/iscorporacioncr/","https://www.facebook.com/TekExperts.CostaRica/","https://es-la.facebook.com/SXCostaRica/","https://es-la.facebook.com/GrupoCMAcr/");
$opts = array(
  'http'=>array(
   // 'header'=>"User-Agent:Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) 
'header'=>"User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
//AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53\r\n"
  )
);
$count=0;
$nombres =array("El Orbe","Conzultek","Corporacion I.S","TekExperts","SoporteXperto","Grupo CMA");
$data="[";
foreach($url as $link){
   $context = stream_context_create($opts);
   $html = file_get_html($link , false, $context);
   $likes=$html->find('div[class=_4-u2 _6590 _3xaf _4-u8]',0)->children(1)->children(0)->children(1)->plaintext;   
   $likes=str_replace('people like this', '', $likes);
   $likes=str_replace('A', '', $likes);
   $likes=str_replace(' ', '', $likes);
    $likes=str_replace('personaslesgustaesto', '', $likes);
     $likes=str_replace('.', ',', $likes);
   echo "<h3> $nombres[$count]: </h3><br>";
   $data= $data.str_replace(',', '', $likes).",";
   echo $likes;
   $count++;
}
$data=rtrim($data,",");
$data=$data."]";
echo "<script>
Chart.defaults.global.defaultFontColor = 'white';
var ctx = document.getElementById('likesChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['El Orbe','Conzultek','Corporacion I.S','TekExperts','SoporteXperto','Grupo CMA'],
        datasets: [{
            label: 'Likes',
            data: $data,
            backgroundColor: [
                'rgba(27, 0, 161, 0.5)',
                'rgba(27, 191, 54, 0.5)',
                'rgba(204, 129, 16, 0.5)',
                'rgba(16, 173, 204,0.5)',
                'rgba(12, 103, 148,0.5)',
                'rgba(0, 155, 232,0.5)'
            ],
            borderColor: [
                'rgba(27, 0, 161, 1)',
                'rgba(27, 191, 54, 1)',
                'rgba(204, 129, 16, 1)',
                'rgba(16, 173, 204,1)',
                'rgba(12, 103, 148,1)',
                'rgba(0, 155, 232,0.5)'

            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
         maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
</script>";
?> 
</body> 
</html> 