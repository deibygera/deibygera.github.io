<!DOCTYPE html> 
<html lang="es"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
    <title>Monitoreo de Medios - Costa Rica</title> 
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
<link href="css/estilo.css" rel="stylesheet" type="text/css">
<link rel="icon" href="eye1.ico" type="image/gif" sizes="16x16">
</head>   
<body> 
    <header>
          <h1>Monitoreo de Medios Costa Rica</h1>
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
$url = array("https://www.facebook.com/Teletica/",
"https://www.facebook.com/noticiasrepretelcostarica/",
"https://www.facebook.com/crhoy.comnoticias/",
"https://www.facebook.com/diarioextra/","https://www.facebook.com/lanacioncr/");
$opts = array(
  'http'=>array(
   // 'header'=>"User-Agent:Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) 
'header'=>"User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
//AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53\r\n"
  )
);
$count=0;
$nombres =array("Teletica","Noticias Repretel","Crhoy","Diario Extra","La Nacion");
$data="[";
foreach($url as $link){
   $context = stream_context_create($opts);
   $html = file_get_html($link , false, $context);
   $likes=$html->find('div[class=_4-u2 _6590 _3xaf _4-u8]',0)->children(1)->children(0)->children(1)->plaintext;   
   $likes=str_replace('people like this', '', $likes);
   $likes=str_replace('A', '', $likes);
   $likes=str_replace(' ', '', $likes);
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
        labels: ['Teletica', 'Noticias Repretel','Crhoy','Diario Extra','La Nacion'],
        datasets: [{
            label: 'Likes',
            data: $data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(92, 223, 237,0.5)',
                'rgba(188, 90, 199,0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(92, 223, 237,1)',
                'rgba(188, 90, 199,1)'

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