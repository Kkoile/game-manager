<template>
  <div class="stars-wrapper" id="scene">
    <div class="layer" data-depth="0.00"></div>
    <div class="stars-cluster stars-cluster-1 layer" data-depth="0.30">
      <div class="star star-1"></div>
      <div class="star star-2"></div>
      <div class="star star-3"></div>
      <div class="star star-4"></div>
      <div class="star star-5"></div>
      <div class="star star-6"></div>
      <div class="star star-7"></div>
      <div class="star star-8"></div>
      <div class="star star-9"></div>
      <div class="star star-10"></div>
      <div class="star star-11"></div>
      <div class="star star-12"></div>
      <div class="star star-13"></div>
      <div class="star star-14"></div>
      <div class="star star-15"></div>
      <div class="star star-16"></div>
      <div class="star star-17"></div>
      <div class="star star-18"></div>
      <div class="star star-19"></div>
      <div class="star star-20"></div>
      <div class="star star-21"></div>
      <div class="star star-22"></div>
      <div class="star star-23"></div>
      <div class="star star-24"></div>
      <div class="star star-25"></div>
      <div class="star star-26"></div>
      <div class="star star-27"></div>
      <div class="star star-28"></div>
      <div class="star star-29"></div>
      <div class="star star-30"></div>
      <div class="star star-31"></div>
      <div class="star star-32"></div>
      <div class="star star-33"></div>
      <div class="star star-34"></div>
      <div class="star star-35"></div>
      <div class="star star-36"></div>
      <div class="star star-37"></div>
      <div class="star star-38"></div>
      <div class="star star-39"></div>
      <div class="star star-40"></div>
    </div>
    <div class="stars-cluster stars-cluster-2 layer" data-depth="0.50">
      <div class="star star-1"></div>
      <div class="star star-2"></div>
      <div class="star star-3"></div>
      <div class="star star-4"></div>
      <div class="star star-5"></div>
      <div class="star star-6"></div>
      <div class="star star-7"></div>
      <div class="star star-8"></div>
      <div class="star star-9"></div>
      <div class="star star-10"></div>
      <div class="star star-11"></div>
      <div class="star star-12"></div>
      <div class="star star-13"></div>
      <div class="star star-14"></div>
      <div class="star star-15"></div>
      <div class="star star-16"></div>
      <div class="star star-17"></div>
      <div class="star star-18"></div>
      <div class="star star-19"></div>
      <div class="star star-20"></div>
      <div class="star star-21"></div>
      <div class="star star-22"></div>
      <div class="star star-23"></div>
      <div class="star star-24"></div>
      <div class="star star-25"></div>
      <div class="star star-26"></div>
      <div class="star star-27"></div>
      <div class="star star-28"></div>
      <div class="star star-29"></div>
      <div class="star star-30"></div>
      <div class="star star-31"></div>
      <div class="star star-32"></div>
      <div class="star star-33"></div>
      <div class="star star-34"></div>
      <div class="star star-35"></div>
      <div class="star star-36"></div>
      <div class="star star-37"></div>
      <div class="star star-38"></div>
      <div class="star star-39"></div>
      <div class="star star-40"></div>
    </div>
    <div class="stars-cluster stars-cluster-3 layer" data-depth="0.90">
      <div class="star star-1"></div>
      <div class="star star-2"></div>
      <div class="star star-3"></div>
      <div class="star star-4"></div>
      <div class="star star-5"></div>
      <div class="star star-6"></div>
      <div class="star star-7"></div>
      <div class="star star-8"></div>
      <div class="star star-9"></div>
      <div class="star star-10"></div>
      <div class="star star-11"></div>
      <div class="star star-12"></div>
      <div class="star star-13"></div>
      <div class="star star-14"></div>
      <div class="star star-15"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .stars-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, #061a33 0%, #000000 100%);
    background-size: 110%;
    background-position: 100% 100%;
    overflow: hidden;
  }
  .stars-cluster {
    position: absolute;
    left: 3%;
    right: 3%;
    top: 3%;
    bottom: 3%;
  }
  .stars-cluster.stars-cluster-1 {
    left: 20%;
    right: 25%;
    top: 20%;
    bottom: 40%;
  }
  .stars-cluster.stars-cluster-1 .star-7,
  .stars-cluster.stars-cluster-1 .star-22,
  .stars-cluster.stars-cluster-1 .star-30 {
    -webkit-animation: shooting-star 10s ease-out 1s forwards;
    animation: shooting-star 10s ease-out 1s forwards;
  }
  .stars-cluster.stars-cluster-1 .star-22 {
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .stars-cluster.stars-cluster-1 .star-30 {
    -webkit-animation-delay: 7s;
    animation-delay: 7s;
  }
  .stars-cluster.stars-cluster-1 .star-20 {
    -webkit-animation: shooting-star-2 8s ease-out 5s forwards infinite;
    animation: shooting-star-2 8s ease-out 5s forwards infinite;
  }
  .stars-cluster.stars-cluster-2 .star-11,
  .stars-cluster.stars-cluster-2 .star-16 {
    -webkit-animation: shooting-star 10s ease-out 8s forwards;
    animation: shooting-star 10s ease-out 8s forwards;
  }
  .stars-cluster.stars-cluster-2 .star-16 {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }
  .stars-cluster.stars-cluster-2 .star-7 {
    -webkit-animation-delay: 9s;
    animation-delay: 9s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .stars-cluster.stars-cluster-2 .star-4 {
    -webkit-animation: shooting-star-2 11s ease-out 6s forwards infinite;
    animation: shooting-star-2 11s ease-out 6s forwards infinite;
  }
  .star {
    background-color: #f3f2d6;
    border-radius: 50%;
    position: absolute;
    -webkit-animation-name: pulsate;
    animation-name: pulsate;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
  }
  /**
   * ----------------------------------------
   * star generator
   * ---------------------------------------
  */
  .stars-cluster-1 .star-1 {
    width: 2px;
    height: 2px;
    opacity: 0.47638724;
    top: 9.23539527%;
    left: 53.37658124%;
    -webkit-animation-duration: 1.52130114s;
    animation-duration: 1.52130114s;
    -webkit-animation-delay: 0.20365269s;
    animation-delay: 0.20365269s;
  }
  .stars-cluster-1 .star-2 {
    width: 2px;
    height: 2px;
    opacity: 0.62472431;
    top: 55.43060894%;
    left: 47.86856451%;
    -webkit-animation-duration: 1.03430037s;
    animation-duration: 1.03430037s;
    -webkit-animation-delay: 0.2493891s;
    animation-delay: 0.2493891s;
  }
  .stars-cluster-1 .star-3 {
    width: 3px;
    height: 3px;
    opacity: 0.46111496;
    top: 19.49334591%;
    left: 56.90515871%;
    -webkit-animation-duration: 2.10513189s;
    animation-duration: 2.10513189s;
    -webkit-animation-delay: 0.42180039s;
    animation-delay: 0.42180039s;
  }
  .stars-cluster-1 .star-4 {
    width: 1px;
    height: 1px;
    opacity: 0.25128572;
    top: 43.09379543%;
    left: 94.23164565%;
    -webkit-animation-duration: 1.31628097s;
    animation-duration: 1.31628097s;
    -webkit-animation-delay: 0.82589252s;
    animation-delay: 0.82589252s;
  }
  .stars-cluster-1 .star-5 {
    width: 1px;
    height: 1px;
    opacity: 0.77332062;
    top: 41.13277591%;
    left: 96.5498507%;
    -webkit-animation-duration: 1.37154592s;
    animation-duration: 1.37154592s;
    -webkit-animation-delay: 0.22151795s;
    animation-delay: 0.22151795s;
  }
  .stars-cluster-1 .star-6 {
    width: 3px;
    height: 3px;
    opacity: 0.66388508;
    top: 52.285815%;
    left: 39.08229651%;
    -webkit-animation-duration: 2.36214601s;
    animation-duration: 2.36214601s;
    -webkit-animation-delay: 0.76530478s;
    animation-delay: 0.76530478s;
  }
  .stars-cluster-1 .star-7 {
    width: 3px;
    height: 3px;
    opacity: 0.26647948;
    top: 89.13332937%;
    left: 99.27042416%;
    -webkit-animation-duration: 1.18291576s;
    animation-duration: 1.18291576s;
    -webkit-animation-delay: 0.98700459s;
    animation-delay: 0.98700459s;
  }
  .stars-cluster-1 .star-8 {
    width: 2px;
    height: 2px;
    opacity: 0.48394005;
    top: 51.86699415%;
    left: 82.4786688%;
    -webkit-animation-duration: 1.63131903s;
    animation-duration: 1.63131903s;
    -webkit-animation-delay: 0.36465164s;
    animation-delay: 0.36465164s;
  }
  .stars-cluster-1 .star-9 {
    width: 2px;
    height: 2px;
    opacity: 0.63881096;
    top: 4.27666921%;
    left: 29.44567179%;
    -webkit-animation-duration: 1.22247653s;
    animation-duration: 1.22247653s;
    -webkit-animation-delay: 0.03107274s;
    animation-delay: 0.03107274s;
  }
  .stars-cluster-1 .star-10 {
    width: 2px;
    height: 2px;
    opacity: 0.60966133;
    top: 24.68307996%;
    left: 99.47961018%;
    -webkit-animation-duration: 0.99968316s;
    animation-duration: 0.99968316s;
    -webkit-animation-delay: 0.43676593s;
    animation-delay: 0.43676593s;
  }
  .stars-cluster-1 .star-11 {
    width: 3px;
    height: 3px;
    opacity: 0.32678001;
    top: 56.70855898%;
    left: 27.1126985%;
    -webkit-animation-duration: 2.35387262s;
    animation-duration: 2.35387262s;
    -webkit-animation-delay: 0.57716693s;
    animation-delay: 0.57716693s;
  }
  .stars-cluster-1 .star-12 {
    width: 2px;
    height: 2px;
    opacity: 0.69053919;
    top: 83.1277744%;
    left: 86.43753029%;
    -webkit-animation-duration: 1.73245149s;
    animation-duration: 1.73245149s;
    -webkit-animation-delay: 0.35327263s;
    animation-delay: 0.35327263s;
  }
  .stars-cluster-1 .star-13 {
    width: 3px;
    height: 3px;
    opacity: 0.35681978;
    top: 8.30624978%;
    left: 67.14227369%;
    -webkit-animation-duration: 2.01792688s;
    animation-duration: 2.01792688s;
    -webkit-animation-delay: 0.03131951s;
    animation-delay: 0.03131951s;
  }
  .stars-cluster-1 .star-14 {
    width: 2px;
    height: 2px;
    opacity: 0.76987992;
    top: 39.80797849%;
    left: 25.08042825%;
    -webkit-animation-duration: 0.86187475s;
    animation-duration: 0.86187475s;
    -webkit-animation-delay: 0.18948081s;
    animation-delay: 0.18948081s;
  }
  .stars-cluster-1 .star-15 {
    width: 2px;
    height: 2px;
    opacity: 0.20594067;
    top: 25.74144937%;
    left: 13.10627028%;
    -webkit-animation-duration: 1.59247706s;
    animation-duration: 1.59247706s;
    -webkit-animation-delay: 0.85983083s;
    animation-delay: 0.85983083s;
  }
  .stars-cluster-1 .star-16 {
    width: 1px;
    height: 1px;
    opacity: 0.27842194;
    top: 20.45248841%;
    left: 90.01853192%;
    -webkit-animation-duration: 2.30130252s;
    animation-duration: 2.30130252s;
    -webkit-animation-delay: 0.91632132s;
    animation-delay: 0.91632132s;
  }
  .stars-cluster-1 .star-17 {
    width: 3px;
    height: 3px;
    opacity: 0.62797675;
    top: 80.56257896%;
    left: 58.06207032%;
    -webkit-animation-duration: 1.71893846s;
    animation-duration: 1.71893846s;
    -webkit-animation-delay: 0.71102149s;
    animation-delay: 0.71102149s;
  }
  .stars-cluster-1 .star-18 {
    width: 1px;
    height: 1px;
    opacity: 0.21345113;
    top: 45.98313998%;
    left: 6.03817234%;
    -webkit-animation-duration: 1.04109907s;
    animation-duration: 1.04109907s;
    -webkit-animation-delay: 0.57848565s;
    animation-delay: 0.57848565s;
  }
  .stars-cluster-1 .star-19 {
    width: 2px;
    height: 2px;
    opacity: 0.72400887;
    top: 81.87790814%;
    left: 26.79602591%;
    -webkit-animation-duration: 0.5330981s;
    animation-duration: 0.5330981s;
    -webkit-animation-delay: 0.76511418s;
    animation-delay: 0.76511418s;
  }
  .stars-cluster-1 .star-20 {
    width: 1px;
    height: 1px;
    opacity: 0.78166353;
    top: 85.22803958%;
    left: 29.0896108%;
    -webkit-animation-duration: 1.59414852s;
    animation-duration: 1.59414852s;
    -webkit-animation-delay: 0.83448619s;
    animation-delay: 0.83448619s;
  }
  .stars-cluster-1 .star-21 {
    width: 2px;
    height: 2px;
    opacity: 0.45247029;
    top: 57.47202832%;
    left: 4.60106015%;
    -webkit-animation-duration: 1.52077067s;
    animation-duration: 1.52077067s;
    -webkit-animation-delay: 0.34836985s;
    animation-delay: 0.34836985s;
  }
  .stars-cluster-1 .star-22 {
    width: 3px;
    height: 3px;
    opacity: 0.2937738;
    top: 1.71001914%;
    left: 79.20506086%;
    -webkit-animation-duration: 2.01768418s;
    animation-duration: 2.01768418s;
    -webkit-animation-delay: 0.51277879s;
    animation-delay: 0.51277879s;
  }
  .stars-cluster-1 .star-23 {
    width: 3px;
    height: 3px;
    opacity: 0.66803793;
    top: 36.45105895%;
    left: 61.0604872%;
    -webkit-animation-duration: 1.7560825s;
    animation-duration: 1.7560825s;
    -webkit-animation-delay: 0.26253762s;
    animation-delay: 0.26253762s;
  }
  .stars-cluster-1 .star-24 {
    width: 1px;
    height: 1px;
    opacity: 0.2759222;
    top: 10.2468129%;
    left: 21.98376371%;
    -webkit-animation-duration: 0.88141125s;
    animation-duration: 0.88141125s;
    -webkit-animation-delay: 0.78421733s;
    animation-delay: 0.78421733s;
  }
  .stars-cluster-1 .star-25 {
    width: 1px;
    height: 1px;
    opacity: 0.3354861;
    top: 66.10445829%;
    left: 15.11245794%;
    -webkit-animation-duration: 1.09897747s;
    animation-duration: 1.09897747s;
    -webkit-animation-delay: 0.38233086s;
    animation-delay: 0.38233086s;
  }
  .stars-cluster-1 .star-26 {
    width: 3px;
    height: 3px;
    opacity: 0.35106061;
    top: 30.63159038%;
    left: 76.40429354%;
    -webkit-animation-duration: 1.59947966s;
    animation-duration: 1.59947966s;
    -webkit-animation-delay: 0.31527956s;
    animation-delay: 0.31527956s;
  }
  .stars-cluster-1 .star-27 {
    width: 1px;
    height: 1px;
    opacity: 0.63466684;
    top: 43.68368466%;
    left: 20.01762983%;
    -webkit-animation-duration: 0.63213688s;
    animation-duration: 0.63213688s;
    -webkit-animation-delay: 0.84804676s;
    animation-delay: 0.84804676s;
  }
  .stars-cluster-1 .star-28 {
    width: 2px;
    height: 2px;
    opacity: 0.7647403;
    top: 49.57249556%;
    left: 56.76919217%;
    -webkit-animation-duration: 0.7176207s;
    animation-duration: 0.7176207s;
    -webkit-animation-delay: 0.42270384s;
    animation-delay: 0.42270384s;
  }
  .stars-cluster-1 .star-29 {
    width: 2px;
    height: 2px;
    opacity: 0.68720612;
    top: 44.87928196%;
    left: 2.56645678%;
    -webkit-animation-duration: 0.50825356s;
    animation-duration: 0.50825356s;
    -webkit-animation-delay: 0.3656393s;
    animation-delay: 0.3656393s;
  }
  .stars-cluster-1 .star-30 {
    width: 2px;
    height: 2px;
    opacity: 0.65016025;
    top: 91.91952611%;
    left: 86.94042224%;
    -webkit-animation-duration: 2.19472966s;
    animation-duration: 2.19472966s;
    -webkit-animation-delay: 0.57606835s;
    animation-delay: 0.57606835s;
  }
  .stars-cluster-1 .star-31 {
    width: 1px;
    height: 1px;
    opacity: 0.47922437;
    top: 2.12410021%;
    left: 94.41314509%;
    -webkit-animation-duration: 0.83390924s;
    animation-duration: 0.83390924s;
    -webkit-animation-delay: 0.62043343s;
    animation-delay: 0.62043343s;
  }
  .stars-cluster-1 .star-32 {
    width: 3px;
    height: 3px;
    opacity: 0.37696467;
    top: 44.64793037%;
    left: 61.98443663%;
    -webkit-animation-duration: 0.54537725s;
    animation-duration: 0.54537725s;
    -webkit-animation-delay: 0.55411484s;
    animation-delay: 0.55411484s;
  }
  .stars-cluster-1 .star-33 {
    width: 2px;
    height: 2px;
    opacity: 0.53792227;
    top: 70.54571429%;
    left: 59.23107202%;
    -webkit-animation-duration: 0.68333157s;
    animation-duration: 0.68333157s;
    -webkit-animation-delay: 0.01608315s;
    animation-delay: 0.01608315s;
  }
  .stars-cluster-1 .star-34 {
    width: 3px;
    height: 3px;
    opacity: 0.75427095;
    top: 58.61797958%;
    left: 13.99083766%;
    -webkit-animation-duration: 0.9833723s;
    animation-duration: 0.9833723s;
    -webkit-animation-delay: 0.10778724s;
    animation-delay: 0.10778724s;
  }
  .stars-cluster-1 .star-35 {
    width: 2px;
    height: 2px;
    opacity: 0.49093228;
    top: 20.86464273%;
    left: 69.33077618%;
    -webkit-animation-duration: 2.04785244s;
    animation-duration: 2.04785244s;
    -webkit-animation-delay: 0.71344859s;
    animation-delay: 0.71344859s;
  }
  .stars-cluster-1 .star-36 {
    width: 2px;
    height: 2px;
    opacity: 0.56506929;
    top: 92.20230609%;
    left: 29.18452192%;
    -webkit-animation-duration: 1.67427037s;
    animation-duration: 1.67427037s;
    -webkit-animation-delay: 0.46003951s;
    animation-delay: 0.46003951s;
  }
  .stars-cluster-1 .star-37 {
    width: 2px;
    height: 2px;
    opacity: 0.20893244;
    top: 41.85523696%;
    left: 36.62604119%;
    -webkit-animation-duration: 1.58337461s;
    animation-duration: 1.58337461s;
    -webkit-animation-delay: 0.67974133s;
    animation-delay: 0.67974133s;
  }
  .stars-cluster-1 .star-38 {
    width: 2px;
    height: 2px;
    opacity: 0.67350612;
    top: 62.67455244%;
    left: 36.12565372%;
    -webkit-animation-duration: 1.46299394s;
    animation-duration: 1.46299394s;
    -webkit-animation-delay: 0.93540803s;
    animation-delay: 0.93540803s;
  }
  .stars-cluster-1 .star-39 {
    width: 2px;
    height: 2px;
    opacity: 0.63296354;
    top: 82.61046244%;
    left: 1.64315063%;
    -webkit-animation-duration: 2.01872707s;
    animation-duration: 2.01872707s;
    -webkit-animation-delay: 0.10078199s;
    animation-delay: 0.10078199s;
  }
  .stars-cluster-1 .star-40 {
    width: 2px;
    height: 2px;
    opacity: 0.4482673;
    top: 46.42740278%;
    left: 11.44583153%;
    -webkit-animation-duration: 1.00603221s;
    animation-duration: 1.00603221s;
    -webkit-animation-delay: 0.13990939s;
    animation-delay: 0.13990939s;
  }
  .stars-cluster-2 .star-1 {
    width: 4px;
    height: 4px;
    opacity: 0.7751858;
    top: 0.38808683%;
    left: 34.48561058%;
    -webkit-animation-duration: 0.93922988s;
    animation-duration: 0.93922988s;
    -webkit-animation-delay: 0.44918161s;
    animation-delay: 0.44918161s;
  }
  .stars-cluster-2 .star-2 {
    width: 4px;
    height: 4px;
    opacity: 0.55981909;
    top: 61.01549668%;
    left: 70.56844019%;
    -webkit-animation-duration: 0.42065139s;
    animation-duration: 0.42065139s;
    -webkit-animation-delay: 0.68080135s;
    animation-delay: 0.68080135s;
  }
  .stars-cluster-2 .star-3 {
    width: 3px;
    height: 3px;
    opacity: 0.28442753;
    top: 45.53679156%;
    left: 89.41697602%;
    -webkit-animation-duration: 0.59460956s;
    animation-duration: 0.59460956s;
    -webkit-animation-delay: 0.89868727s;
    animation-delay: 0.89868727s;
  }
  .stars-cluster-2 .star-4 {
    width: 3px;
    height: 3px;
    opacity: 0.63018436;
    top: 11.26447708%;
    left: 96.74642329%;
    -webkit-animation-duration: 1.81787031s;
    animation-duration: 1.81787031s;
    -webkit-animation-delay: 0.2872384s;
    animation-delay: 0.2872384s;
  }
  .stars-cluster-2 .star-5 {
    width: 4px;
    height: 4px;
    opacity: 0.63564716;
    top: 79.0001154%;
    left: 38.08577727%;
    -webkit-animation-duration: 2.32450019s;
    animation-duration: 2.32450019s;
    -webkit-animation-delay: 0.73005055s;
    animation-delay: 0.73005055s;
  }
  .stars-cluster-2 .star-6 {
    width: 2px;
    height: 2px;
    opacity: 0.7356435;
    top: 25.10266071%;
    left: 51.17584862%;
    -webkit-animation-duration: 2.31963607s;
    animation-duration: 2.31963607s;
    -webkit-animation-delay: 0.29955412s;
    animation-delay: 0.29955412s;
  }
  .stars-cluster-2 .star-7 {
    width: 4px;
    height: 4px;
    opacity: 0.71919206;
    top: 31.66400507%;
    left: 57.27641449%;
    -webkit-animation-duration: 1.14555155s;
    animation-duration: 1.14555155s;
    -webkit-animation-delay: 0.5304049s;
    animation-delay: 0.5304049s;
  }
  .stars-cluster-2 .star-8 {
    width: 4px;
    height: 4px;
    opacity: 0.67586237;
    top: 63.12088697%;
    left: 31.5300171%;
    -webkit-animation-duration: 0.63709236s;
    animation-duration: 0.63709236s;
    -webkit-animation-delay: 0.41284271s;
    animation-delay: 0.41284271s;
  }
  .stars-cluster-2 .star-9 {
    width: 2px;
    height: 2px;
    opacity: 0.77071679;
    top: 85.84321784%;
    left: 92.83884752%;
    -webkit-animation-duration: 1.82571773s;
    animation-duration: 1.82571773s;
    -webkit-animation-delay: 0.13006721s;
    animation-delay: 0.13006721s;
  }
  .stars-cluster-2 .star-10 {
    width: 3px;
    height: 3px;
    opacity: 0.53511764;
    top: 18.8848029%;
    left: 97.43879315%;
    -webkit-animation-duration: 0.81285101s;
    animation-duration: 0.81285101s;
    -webkit-animation-delay: 0.34648304s;
    animation-delay: 0.34648304s;
  }
  .stars-cluster-2 .star-11 {
    width: 4px;
    height: 4px;
    opacity: 0.38990857;
    top: 64.77269186%;
    left: 30.58683835%;
    -webkit-animation-duration: 1.23854038s;
    animation-duration: 1.23854038s;
    -webkit-animation-delay: 0.08598029s;
    animation-delay: 0.08598029s;
  }
  .stars-cluster-2 .star-12 {
    width: 3px;
    height: 3px;
    opacity: 0.68805377;
    top: 66.93749251%;
    left: 98.77869321%;
    -webkit-animation-duration: 1.40408335s;
    animation-duration: 1.40408335s;
    -webkit-animation-delay: 0.07849997s;
    animation-delay: 0.07849997s;
  }
  .stars-cluster-2 .star-13 {
    width: 2px;
    height: 2px;
    opacity: 0.46541253;
    top: 58.28573633%;
    left: 98.3069057%;
    -webkit-animation-duration: 0.79248971s;
    animation-duration: 0.79248971s;
    -webkit-animation-delay: 0.32315413s;
    animation-delay: 0.32315413s;
  }
  .stars-cluster-2 .star-14 {
    width: 3px;
    height: 3px;
    opacity: 0.48803334;
    top: 99.08377069%;
    left: 11.90709345%;
    -webkit-animation-duration: 1.46924161s;
    animation-duration: 1.46924161s;
    -webkit-animation-delay: 0.94175201s;
    animation-delay: 0.94175201s;
  }
  .stars-cluster-2 .star-15 {
    width: 2px;
    height: 2px;
    opacity: 0.45473394;
    top: 83.91982968%;
    left: 0.199636%;
    -webkit-animation-duration: 0.53035395s;
    animation-duration: 0.53035395s;
    -webkit-animation-delay: 0.21468046s;
    animation-delay: 0.21468046s;
  }
  .stars-cluster-2 .star-16 {
    width: 2px;
    height: 2px;
    opacity: 0.49734339;
    top: 9.17941779%;
    left: 15.95856648%;
    -webkit-animation-duration: 0.50256053s;
    animation-duration: 0.50256053s;
    -webkit-animation-delay: 0.34437066s;
    animation-delay: 0.34437066s;
  }
  .stars-cluster-2 .star-17 {
    width: 3px;
    height: 3px;
    opacity: 0.40447281;
    top: 82.83066542%;
    left: 11.68111135%;
    -webkit-animation-duration: 1.34735404s;
    animation-duration: 1.34735404s;
    -webkit-animation-delay: 0.36242366s;
    animation-delay: 0.36242366s;
  }
  .stars-cluster-2 .star-18 {
    width: 3px;
    height: 3px;
    opacity: 0.54686442;
    top: 38.13107968%;
    left: 99.5294727%;
    -webkit-animation-duration: 2.39962106s;
    animation-duration: 2.39962106s;
    -webkit-animation-delay: 0.12263321s;
    animation-delay: 0.12263321s;
  }
  .stars-cluster-2 .star-19 {
    width: 3px;
    height: 3px;
    opacity: 0.50021374;
    top: 25.90111446%;
    left: 71.87464282%;
    -webkit-animation-duration: 1.5756632s;
    animation-duration: 1.5756632s;
    -webkit-animation-delay: 0.62479892s;
    animation-delay: 0.62479892s;
  }
  .stars-cluster-2 .star-20 {
    width: 3px;
    height: 3px;
    opacity: 0.63541949;
    top: 37.75739247%;
    left: 50.91330293%;
    -webkit-animation-duration: 2.14090677s;
    animation-duration: 2.14090677s;
    -webkit-animation-delay: 0.93355005s;
    animation-delay: 0.93355005s;
  }
  .stars-cluster-2 .star-21 {
    width: 3px;
    height: 3px;
    opacity: 0.2573306;
    top: 90.37675963%;
    left: 44.29761339%;
    -webkit-animation-duration: 1.81518562s;
    animation-duration: 1.81518562s;
    -webkit-animation-delay: 0.7527352s;
    animation-delay: 0.7527352s;
  }
  .stars-cluster-2 .star-22 {
    width: 3px;
    height: 3px;
    opacity: 0.7481715;
    top: 65.27843332%;
    left: 28.03573931%;
    -webkit-animation-duration: 0.85043006s;
    animation-duration: 0.85043006s;
    -webkit-animation-delay: 0.77505357s;
    animation-delay: 0.77505357s;
  }
  .stars-cluster-2 .star-23 {
    width: 4px;
    height: 4px;
    opacity: 0.63359877;
    top: 86.53354692%;
    left: 77.87470388%;
    -webkit-animation-duration: 2.13514367s;
    animation-duration: 2.13514367s;
    -webkit-animation-delay: 0.47922282s;
    animation-delay: 0.47922282s;
  }
  .stars-cluster-2 .star-24 {
    width: 2px;
    height: 2px;
    opacity: 0.48909085;
    top: 51.31967109%;
    left: 44.72012056%;
    -webkit-animation-duration: 1.28061559s;
    animation-duration: 1.28061559s;
    -webkit-animation-delay: 0.77913536s;
    animation-delay: 0.77913536s;
  }
  .stars-cluster-2 .star-25 {
    width: 3px;
    height: 3px;
    opacity: 0.72952495;
    top: 0.56237631%;
    left: 4.15618512%;
    -webkit-animation-duration: 0.45769634s;
    animation-duration: 0.45769634s;
    -webkit-animation-delay: 0.77392355s;
    animation-delay: 0.77392355s;
  }
  .stars-cluster-2 .star-26 {
    width: 2px;
    height: 2px;
    opacity: 0.30102953;
    top: 36.18303984%;
    left: 93.89126595%;
    -webkit-animation-duration: 1.349436s;
    animation-duration: 1.349436s;
    -webkit-animation-delay: 0.93919845s;
    animation-delay: 0.93919845s;
  }
  .stars-cluster-2 .star-27 {
    width: 3px;
    height: 3px;
    opacity: 0.2799497;
    top: 33.93161961%;
    left: 11.57837983%;
    -webkit-animation-duration: 2.01247634s;
    animation-duration: 2.01247634s;
    -webkit-animation-delay: 0.45431539s;
    animation-delay: 0.45431539s;
  }
  .stars-cluster-2 .star-28 {
    width: 3px;
    height: 3px;
    opacity: 0.58376135;
    top: 77.62213711%;
    left: 2.35119065%;
    -webkit-animation-duration: 1.31791126s;
    animation-duration: 1.31791126s;
    -webkit-animation-delay: 0.68595383s;
    animation-delay: 0.68595383s;
  }
  .stars-cluster-2 .star-29 {
    width: 3px;
    height: 3px;
    opacity: 0.22718856;
    top: 3.0438405%;
    left: 31.30868503%;
    -webkit-animation-duration: 1.55110643s;
    animation-duration: 1.55110643s;
    -webkit-animation-delay: 0.74826019s;
    animation-delay: 0.74826019s;
  }
  .stars-cluster-2 .star-30 {
    width: 4px;
    height: 4px;
    opacity: 0.71369198;
    top: 17.73619544%;
    left: 80.3852023%;
    -webkit-animation-duration: 1.76093428s;
    animation-duration: 1.76093428s;
    -webkit-animation-delay: 0.84097577s;
    animation-delay: 0.84097577s;
  }
  .stars-cluster-2 .star-31 {
    width: 2px;
    height: 2px;
    opacity: 0.75295987;
    top: 9.62979502%;
    left: 66.11266737%;
    -webkit-animation-duration: 1.81205742s;
    animation-duration: 1.81205742s;
    -webkit-animation-delay: 0.13176025s;
    animation-delay: 0.13176025s;
  }
  .stars-cluster-2 .star-32 {
    width: 3px;
    height: 3px;
    opacity: 0.31375911;
    top: 59.3525634%;
    left: 3.11696082%;
    -webkit-animation-duration: 0.70104559s;
    animation-duration: 0.70104559s;
    -webkit-animation-delay: 0.44235009s;
    animation-delay: 0.44235009s;
  }
  .stars-cluster-2 .star-33 {
    width: 3px;
    height: 3px;
    opacity: 0.51350148;
    top: 98.96112731%;
    left: 26.43296942%;
    -webkit-animation-duration: 1.0628847s;
    animation-duration: 1.0628847s;
    -webkit-animation-delay: 0.17719321s;
    animation-delay: 0.17719321s;
  }
  .stars-cluster-2 .star-34 {
    width: 3px;
    height: 3px;
    opacity: 0.63485142;
    top: 94.03987765%;
    left: 77.29924288%;
    -webkit-animation-duration: 1.33241474s;
    animation-duration: 1.33241474s;
    -webkit-animation-delay: 0.52838496s;
    animation-delay: 0.52838496s;
  }
  .stars-cluster-2 .star-35 {
    width: 3px;
    height: 3px;
    opacity: 0.49885212;
    top: 27.98366375%;
    left: 81.64268607%;
    -webkit-animation-duration: 1.16752139s;
    animation-duration: 1.16752139s;
    -webkit-animation-delay: 0.17772846s;
    animation-delay: 0.17772846s;
  }
  .stars-cluster-2 .star-36 {
    width: 3px;
    height: 3px;
    opacity: 0.33901712;
    top: 6.65099979%;
    left: 56.0280238%;
    -webkit-animation-duration: 1.2442068s;
    animation-duration: 1.2442068s;
    -webkit-animation-delay: 0.86466396s;
    animation-delay: 0.86466396s;
  }
  .stars-cluster-2 .star-37 {
    width: 2px;
    height: 2px;
    opacity: 0.44164242;
    top: 89.53294288%;
    left: 48.62340696%;
    -webkit-animation-duration: 0.66833902s;
    animation-duration: 0.66833902s;
    -webkit-animation-delay: 0.1906196s;
    animation-delay: 0.1906196s;
  }
  .stars-cluster-2 .star-38 {
    width: 3px;
    height: 3px;
    opacity: 0.59045023;
    top: 88.193715%;
    left: 40.97620634%;
    -webkit-animation-duration: 1.28002447s;
    animation-duration: 1.28002447s;
    -webkit-animation-delay: 0.56451265s;
    animation-delay: 0.56451265s;
  }
  .stars-cluster-2 .star-39 {
    width: 4px;
    height: 4px;
    opacity: 0.72843688;
    top: 67.3669295%;
    left: 6.80852231%;
    -webkit-animation-duration: 1.59342093s;
    animation-duration: 1.59342093s;
    -webkit-animation-delay: 0.91761939s;
    animation-delay: 0.91761939s;
  }
  .stars-cluster-2 .star-40 {
    width: 4px;
    height: 4px;
    opacity: 0.74675636;
    top: 93.29668311%;
    left: 53.44731206%;
    -webkit-animation-duration: 1.36508172s;
    animation-duration: 1.36508172s;
    -webkit-animation-delay: 0.57625382s;
    animation-delay: 0.57625382s;
  }
  .stars-cluster-3 .star-1 {
    width: 3px;
    height: 3px;
    opacity: 0.37211728;
    top: 92.46230864%;
    left: 89.56024926%;
    -webkit-animation-duration: 0.7883813s;
    animation-duration: 0.7883813s;
    -webkit-animation-delay: 0.8156249s;
    animation-delay: 0.8156249s;
  }
  .stars-cluster-3 .star-2 {
    width: 5px;
    height: 5px;
    opacity: 0.37499095;
    top: 19.39513408%;
    left: 5.00888482%;
    -webkit-animation-duration: 0.63494643s;
    animation-duration: 0.63494643s;
    -webkit-animation-delay: 0.17354022s;
    animation-delay: 0.17354022s;
  }
  .stars-cluster-3 .star-3 {
    width: 3px;
    height: 3px;
    opacity: 0.28889;
    top: 34.45470481%;
    left: 52.70696964%;
    -webkit-animation-duration: 1.92116643s;
    animation-duration: 1.92116643s;
    -webkit-animation-delay: 0.41202275s;
    animation-delay: 0.41202275s;
  }
  .stars-cluster-3 .star-4 {
    width: 3px;
    height: 3px;
    opacity: 0.77508698;
    top: 54.00506195%;
    left: 50.99764989%;
    -webkit-animation-duration: 1.89793826s;
    animation-duration: 1.89793826s;
    -webkit-animation-delay: 0.53276927s;
    animation-delay: 0.53276927s;
  }
  .stars-cluster-3 .star-5 {
    width: 5px;
    height: 5px;
    opacity: 0.3583198;
    top: 33.92796435%;
    left: 78.420219%;
    -webkit-animation-duration: 1.4128379s;
    animation-duration: 1.4128379s;
    -webkit-animation-delay: 0.33682625s;
    animation-delay: 0.33682625s;
  }
  .stars-cluster-3 .star-6 {
    width: 4px;
    height: 4px;
    opacity: 0.42685304;
    top: 35.77199277%;
    left: 35.73118888%;
    -webkit-animation-duration: 1.32589676s;
    animation-duration: 1.32589676s;
    -webkit-animation-delay: 0.88236072s;
    animation-delay: 0.88236072s;
  }
  .stars-cluster-3 .star-7 {
    width: 3px;
    height: 3px;
    opacity: 0.66250839;
    top: 52.69396256%;
    left: 43.88199242%;
    -webkit-animation-duration: 2.14543147s;
    animation-duration: 2.14543147s;
    -webkit-animation-delay: 0.66936866s;
    animation-delay: 0.66936866s;
  }
  .stars-cluster-3 .star-8 {
    width: 3px;
    height: 3px;
    opacity: 0.44118955;
    top: 77.00638785%;
    left: 38.47219965%;
    -webkit-animation-duration: 1.02286166s;
    animation-duration: 1.02286166s;
    -webkit-animation-delay: 0.6796991s;
    animation-delay: 0.6796991s;
  }
  .stars-cluster-3 .star-9 {
    width: 3px;
    height: 3px;
    opacity: 0.51503055;
    top: 1.8189826%;
    left: 33.00414274%;
    -webkit-animation-duration: 1.84169834s;
    animation-duration: 1.84169834s;
    -webkit-animation-delay: 0.11766138s;
    animation-delay: 0.11766138s;
  }
  .stars-cluster-3 .star-10 {
    width: 4px;
    height: 4px;
    opacity: 0.48767429;
    top: 42.53302057%;
    left: 0.06360042%;
    -webkit-animation-duration: 2.39614181s;
    animation-duration: 2.39614181s;
    -webkit-animation-delay: 0.64605991s;
    animation-delay: 0.64605991s;
  }
  .stars-cluster-3 .star-11 {
    width: 3px;
    height: 3px;
    opacity: 0.48168627;
    top: 58.9772931%;
    left: 8.89692181%;
    -webkit-animation-duration: 2.33955056s;
    animation-duration: 2.33955056s;
    -webkit-animation-delay: 0.2815126s;
    animation-delay: 0.2815126s;
  }
  .stars-cluster-3 .star-12 {
    width: 4px;
    height: 4px;
    opacity: 0.36276668;
    top: 61.41922003%;
    left: 79.70335821%;
    -webkit-animation-duration: 1.92674323s;
    animation-duration: 1.92674323s;
    -webkit-animation-delay: 0.33821417s;
    animation-delay: 0.33821417s;
  }
  .stars-cluster-3 .star-13 {
    width: 4px;
    height: 4px;
    opacity: 0.44620501;
    top: 38.64450785%;
    left: 37.79075624%;
    -webkit-animation-duration: 1.41599206s;
    animation-duration: 1.41599206s;
    -webkit-animation-delay: 0.51292785s;
    animation-delay: 0.51292785s;
  }
  .stars-cluster-3 .star-14 {
    width: 3px;
    height: 3px;
    opacity: 0.44108037;
    top: 79.9124669%;
    left: 26.78526815%;
    -webkit-animation-duration: 0.9175392s;
    animation-duration: 0.9175392s;
    -webkit-animation-delay: 0.88424845s;
    animation-delay: 0.88424845s;
  }
  .stars-cluster-3 .star-15 {
    width: 5px;
    height: 5px;
    opacity: 0.4879936;
    top: 96.94576752%;
    left: 62.13253292%;
    -webkit-animation-duration: 0.71221259s;
    animation-duration: 0.71221259s;
    -webkit-animation-delay: 0.77622977s;
    animation-delay: 0.77622977s;
  }
  /**
   * ----------------------------------------
   * animation pulsate
   * ---------------------------------------
  */
  @-webkit-keyframes pulsate {
    0% {
      -webkit-transform: scale(0.85);
      transform: scale(0.85);
      opacity: 0.2;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes pulsate {
    0% {
      -webkit-transform: scale(0.85);
      transform: scale(0.85);
      opacity: 0.2;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  /**
   * ----------------------------------------
   * animation shooting-star
   * ---------------------------------------
  */
  @-webkit-keyframes shooting-star {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 1;
    }
    20%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform: translate(400px, 200px);
      transform: translate(400px, 200px);
      opacity: 0;
    }
  }
  @keyframes shooting-star {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 1;
    }
    20%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform: translate(400px, 200px);
      transform: translate(400px, 200px);
      opacity: 0;
    }
  }
  /**
   * ----------------------------------------
   * animation shooting-star-2
   * ---------------------------------------
  */
  @-webkit-keyframes shooting-star-2 {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 1;
    }
    10%,
    100% {
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
      -webkit-transform: translate(600px, 150px);
      transform: translate(600px, 150px);
      opacity: 0.3;
    }
  }
  @keyframes shooting-star-2 {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 1;
    }
    10%,
    100% {
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
      -webkit-transform: translate(600px, 150px);
      transform: translate(600px, 150px);
      opacity: 0.3;
    }
  }
</style>
