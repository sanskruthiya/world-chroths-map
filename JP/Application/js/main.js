const map = L.map('map', {
                zoomControl: true, maxZoom:15, minZoom:1
                }).setView([21.0000, 36.0000], 2);

const basemap_main = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                               {attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',maxZoom: 15});

const mapBounds = [[90,-360],[-90,360]];
map.setMaxBounds(mapBounds)

//Off Stats
let offstats;

function offstats_style(feature){
    return{
        "fillColor": "transparent",
        "color": "white",
        "weight": 0,
    };
}

function highlightFeature_off(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         "fillColor": "transparent",
                         "color": "white",
                         "weight": 2,
    })
 if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
    stats_layer.bringToFront();
 }
}

function resetHighlight_off(e){
    offstats.resetStyle(e.target);
}

function infoFeature_off(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function offstats_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_off
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_off,
                 mouseout: resetHighlight_off
                 });
    };
    layer.bindTooltip('<p class="tipstyle04">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'bottom', offset:[0,15], opacity: 0.9});
}

offstats = new L.geoJson(json_country, {style: offstats_style, onEachFeature: offstats_onEachFeature})

//Population Density
let Country_Stats_PPD;

function getColor_PPD(d){
    return d == 6 ? '#d53e4f':
    d == 5 ? '#fc8d59':
    d == 4 ? '#fee08b':
    d == 3 ? '#e6f598':
    d == 2 ? '#99d594':
    d == 1 ? '#3288bd':
    '#999999';
}

function stats_PPD_style(feature){
    return{
    fillColor: getColor_PPD(feature.properties.d_ppd_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_PPD(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_PPD(e){
    Country_Stats_PPD.resetStyle(e.target);
}

function infoFeature_PPD(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_PPD_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_PPD
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_PPD,
                 mouseout: resetHighlight_PPD
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">人口密度: '+feature.properties.d_ppd+' 人/平方km<br>人口: '+feature.properties.d_pop/1000+' 百万人<br>261 か国中 '+feature.properties.d_ppd_rk+' 位（グループ '+feature.properties.d_ppd_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}
Country_Stats_PPD = new L.geoJson(json_country, {style: stats_PPD_style, onEachFeature: stats_PPD_onEachFeature});

//GNI PPP per capita
let Country_Stats_GNI;

function getColor_GNI(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_GNI_style(feature){
    return{
    fillColor: getColor_GNI(feature.properties.d_gni_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_GNI(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_GNI(e){
    Country_Stats_GNI.resetStyle(e.target);
}

function infoFeature_GNI(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_GNI_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_GNI
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_GNI,
                 mouseout: resetHighlight_GNI
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">1人当たり所得: '+feature.properties.d_gni+' int.dollars<br>190 か国中 '+feature.properties.d_gni_rk+' 位（グループ '+feature.properties.d_gni_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}
Country_Stats_GNI = new L.geoJson(json_country, {style: stats_GNI_style, onEachFeature: stats_GNI_onEachFeature});

//Human Development Indicator
let Country_Stats_HDI;

function getColor_HDI(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}
 
function stats_HDI_style(feature){
    return{
    fillColor: getColor_HDI(feature.properties.d_hdi_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}
 
function highlightFeature_HDI(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}
 
function resetHighlight_HDI(e){
    Country_Stats_HDI.resetStyle(e.target);
}
 
function infoFeature_HDI(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_HDI_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_HDI
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_HDI,
                 mouseout: resetHighlight_HDI
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">国連人間開発指数: '+feature.properties.d_hdi+'<br>189 か国中 '+feature.properties.d_hdi_rk+' 位（グループ '+feature.properties.d_hdi_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}

Country_Stats_HDI = new L.geoJson(json_country, {style: stats_HDI_style, onEachFeature: stats_HDI_onEachFeature})

//Education Index
let Country_Stats_EDU;

function getColor_EDU(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_EDU_style(feature){
    return{
    fillColor: getColor_EDU(feature.properties.d_edu_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_EDU(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_EDU(e){
    Country_Stats_EDU.resetStyle(e.target);
}

function infoFeature_EDU(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_EDU_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_EDU
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_EDU,
                 mouseout: resetHighlight_EDU
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">教育水準指数: '+feature.properties.d_edu+'<br>188 か国中 '+feature.properties.d_edu_rk+' 位（グループ '+feature.properties.d_edu_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}
Country_Stats_EDU = new L.geoJson(json_country, {style: stats_EDU_style, onEachFeature: stats_EDU_onEachFeature});

//Gender Inequality Index
let Country_Stats_GEN;

function getColor_GEN(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_GEN_style(feature){
    return{
    fillColor: getColor_GEN(feature.properties.d_gen_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_GEN(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_GEN(e){
    Country_Stats_GEN.resetStyle(e.target);
}

function infoFeature_GEN(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_GEN_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_GEN
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_GEN,
                 mouseout: resetHighlight_GEN
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">ジェンダー平等指数: '+feature.properties.d_gen+'<br>149 か国中 '+feature.properties.d_gen_rk+' 位（グループ '+feature.properties.d_gen_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}

Country_Stats_GEN = new L.geoJson(json_country, {style: stats_GEN_style, onEachFeature: stats_GEN_onEachFeature})

//Happy Planet Index
let Country_Stats_HPI;

function getColor_HPI(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_HPI_style(feature){
    return{
    fillColor: getColor_HPI(feature.properties.d_hpi_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_HPI(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_HPI(e){
    Country_Stats_HPI.resetStyle(e.target);
}

function infoFeature_HPI(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_HPI_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_HPI
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_HPI,
                 mouseout: resetHighlight_HPI
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">幸福度指数: '+feature.properties.d_hpi+'<br>156 か国中 '+feature.properties.d_hpi_rk+' 位（グループ '+feature.properties.d_hpi_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}
Country_Stats_HPI = new L.geoJson(json_country, {style: stats_HPI_style, onEachFeature: stats_HPI_onEachFeature});

//Healthy Life Expectancy
let Country_Stats_HLX;

function getColor_HLX(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_HLX_style(feature){
    return{
    fillColor: getColor_HLX(feature.properties.d_hlx_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_HLX(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_HLX(e){
    Country_Stats_HLX.resetStyle(e.target);
}

function infoFeature_HLX(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_HLX_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_HLX
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_HLX,
                 mouseout: resetHighlight_HLX
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">健康寿命年齢: '+feature.properties.d_hlx+' 歳<br>183 か国中 '+feature.properties.d_hlx_rk+' 位（グループ '+feature.properties.d_hlx_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}
Country_Stats_HLX = new L.geoJson(json_country, {style: stats_HLX_style, onEachFeature: stats_HLX_onEachFeature});

//Ecological Footprint
let Country_Stats_ECO;

function getColor_ECO(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_ECO_style(feature){
    return{
    fillColor: getColor_ECO(feature.properties.d_eco_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_ECO(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_ECO(e){
    Country_Stats_ECO.resetStyle(e.target);
}

function infoFeature_ECO(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_ECO_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_ECO
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_ECO,
                 mouseout: resetHighlight_ECO
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">環境負荷指数: 地球 '+feature.properties.d_eco+' 個分<br>214 か国中 '+feature.properties.d_eco_rk+' 位（グループ '+feature.properties.d_eco_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}
Country_Stats_ECO = new L.geoJson(json_country, {style: stats_ECO_style, onEachFeature: stats_ECO_onEachFeature});

//Disaster Risk Index
let Country_Stats_DSR;

function getColor_DSR(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_DSR_style(feature){
    return{
    fillColor: getColor_DSR(feature.properties.d_dsr_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_DSR(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_DSR(e){
    Country_Stats_DSR.resetStyle(e.target);
}

function infoFeature_DSR(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_DSR_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_DSR
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_DSR,
                 mouseout: resetHighlight_DSR
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">災害リスク指数: '+feature.properties.d_dsr+'<br>171 か国中 '+feature.properties.d_dsr_rk+' 位 （グループ '+feature.properties.d_dsr_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}

Country_Stats_DSR = new L.geoJson(json_country, {style: stats_DSR_style, onEachFeature: stats_DSR_onEachFeature})

//Global Peace Index
let Country_Stats_PCE;

function getColor_PCE(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_PCE_style(feature){
    return{
    fillColor: getColor_PCE(feature.properties.d_pce_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_PCE(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_PCE(e){
    Country_Stats_PCE.resetStyle(e.target);
}

function infoFeature_PCE(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_PCE_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_PCE
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_PCE,
                 mouseout: resetHighlight_PCE
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">平和リスク指数: '+feature.properties.d_pce+'<br>163 か国中 '+feature.properties.d_pce_rk+' 位（グループ '+feature.properties.d_pce_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}

Country_Stats_PCE = new L.geoJson(json_country, {style: stats_PCE_style, onEachFeature: stats_PCE_onEachFeature})


//Press Freedom Index
let Country_Stats_PFI;

function getColor_PFI(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_PFI_style(feature){
    return{
    fillColor: getColor_PFI(feature.properties.d_pfi_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_PFI(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_PFI(e){
    Country_Stats_PFI.resetStyle(e.target);
}

function infoFeature_PFI(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_PFI_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_PFI
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_PFI,
                 mouseout: resetHighlight_PFI
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">報道の自由度: '+feature.properties.d_pfi+'<br>180 か国中 '+feature.properties.d_pfi_rk+' 位（グループ '+feature.properties.d_pfi_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}
Country_Stats_PFI = new L.geoJson(json_country, {style: stats_PFI_style, onEachFeature: stats_PFI_onEachFeature});

//ICT Development Index
let Country_Stats_ICT;

function getColor_ICT(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_ICT_style(feature){
    return{
    fillColor: getColor_ICT(feature.properties.d_ict_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_ICT(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_ICT(e){
    Country_Stats_ICT.resetStyle(e.target);
}

function infoFeature_ICT(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_ICT_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_ICT
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_ICT,
                 mouseout: resetHighlight_ICT
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">ICT開発指数: '+feature.properties.d_ict+'<br>176 か国中 '+feature.properties.d_ict_rk+' 位（グループ '+feature.properties.d_ict_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}

Country_Stats_ICT = new L.geoJson(json_country, {style: stats_ICT_style, onEachFeature: stats_ICT_onEachFeature})

//Internet Penetration Rate
let Country_Stats_ITN;

function getColor_ITN(d){
    return d > 5 ? '#d53e4f':
    d > 4 ? '#fc8d59':
    d > 3 ? '#fee08b':
    d > 2 ? '#e6f598':
    d > 1 ? '#99d594':
    d > 0 ? '#3288bd':
    '#999999';
}

function stats_ITN_style(feature){
    return{
    fillColor: getColor_ITN(feature.properties.d_itn_gr),
    weight: 0.7,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.6
    };
}

function highlightFeature_ITN(e){
    const stats_layer = e.target;
    stats_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         dashArray: '',
                         fillOpacity: 0.7
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function resetHighlight_ITN(e){
    Country_Stats_ITN.resetStyle(e.target);
}

function infoFeature_ITN(e){
    const stats_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        stats_layer.bringToFront();
    }
}

function stats_ITN_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_ITN
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_ITN,
                 mouseout: resetHighlight_ITN
                 });
    };
    layer.bindTooltip('<p class="tipstyle02">インターネット浸透率: '+feature.properties.d_itn+'<br>225 か国中 '+feature.properties.d_itn_rk+' 位（グループ '+feature.properties.d_itn_gr+')</p><hr><p class="tipstyle01">'+feature.properties.d_Name_jp+'</p>',{className: 'tipstyle', sticky: 'true', direction:'top', offset:[0,-15], opacity: 0.9});
}
Country_Stats_ITN = new L.geoJson(json_country, {style: stats_ITN_style, onEachFeature: stats_ITN_onEachFeature});

//Timezones for Global-Clock Viewer Mode
let Timezones_Layer;
L.timezones = new L.Timezones();

function Timezones_Layer_style(feature){
    return{
        "fillColor": "transparent",
        "color": "white",
        "weight": 1,
    };
}

function highlightFeature_TZL(e){
    const TZL_layer = e.target;
    TZL_layer.setStyle({
                         weight: 2,
                         color: 'white',
                         fillColor: 'grey',
                         dashArray: '',
                         fillOpacity: 0.5
                         });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        TZL_layer.bringToFront();
    }
}

function resetHighlight_TZL(e){
    Timezones_Layer.resetStyle(e.target);
}

function infoFeature_TZL(e){
    const TZL_layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        TZL_layer.bringToFront();
    }
}

function Timezones_Layer_onEachFeature(feature, layer){
    if (L.Browser.mobile){
        layer.on({
                 click: infoFeature_TZL
                 });
    }else{
        layer.on({
                 mouseover: highlightFeature_TZL,
                 mouseout: resetHighlight_TZL
                 });
    };
    layer.bindTooltip(function(layer){
                      return new Date().toLocaleString("ja-JP", {timeZone:layer.feature.properties.tz_name1st,timeZoneName:"short"});
                      },{className: 'tipstyle02', sticky: 'true', direction:'bottom', offset:[0,20], opacity: 0.9});
}
Timezones_Layer = new L.geoJson(L.timezones.geojsonFeature, {style: Timezones_Layer_style, onEachFeature: Timezones_Layer_onEachFeature});

//Day and Night Display
const day_night = L.terminator({fillOpacity:0.3});

//for Country Search Function
const country_style = {
    "fillColor": "transparent",
    "Color": "blue",
    "weight": 0,
};

const country = new L.geoJson(json_country, {style:country_style, onEachFeature: function(feature, layer){layer.bindPopup(feature.properties.d_Name_jp)}});

const searchLayer = new L.layerGroup([
    country
     ]);
searchLayer.addTo(map);

const searchControl = new L.control.search({
                 position:'topright',
                 layer: searchLayer,
                 initial: false,
                 propertyName: 'd_Name_jp',
                 marker: false,
                 zoom: 2,
                 minLength: 1,
                 collapsed: false,
                 textPlaceholder: '国名検索: 半角スペースで全ての国をリスト表示します　　　　　　　　　　　　'
                 });
searchControl.on('search:locationfound', function(e){
    e.layer.openPopup();
});

if (!L.Browser.mobile) {
map.addControl( searchControl );
}

//Add default layers
country.addTo(map);
basemap_main.addTo(map);
//offstats.addTo(map);
Country_Stats_HDI.addTo(map);

//Legend
const baseMaps = {
    '<i class="fas fa-users fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 人口密度': Country_Stats_PPD,
    '<i class="fas fa-dollar-sign fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 1人あたり国民所得': Country_Stats_GNI,
    '<i class="fas fa-universal-access fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 国連人間開発指数': Country_Stats_HDI,
    '<i class="fas fa-graduation-cap fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 教育水準指数': Country_Stats_EDU,
    '<i class="fas fa-venus-mars fa-fw" style="color:orange"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> ジェンダー平等指数': Country_Stats_GEN,
    '<i class="fas fa-heart fa-fw" style="color:red"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 幸福度指数': Country_Stats_HPI,
    '<i class="fas fa-plus-square fa-fw" style="color:orange"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 健康寿命年齢': Country_Stats_HLX,
    '<i class="fas fa-leaf fa-fw" style="color:green"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 環境負荷指数': Country_Stats_ECO,
    '<i class="fas fa-bolt fa-fw" style="color:orange"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 災害リスク指数': Country_Stats_DSR,
    '<i class="fas fa-handshake fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 平和リスク指数': Country_Stats_PCE,
    '<i class="fas fa-paint-brush fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 報道の自由度': Country_Stats_PFI,
    '<i class="fab fa-usb fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> ICT開発指数': Country_Stats_ICT,
    '<i class="fas fa-wifi fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> インターネット浸透率<br><img src="Application/css/images/legend.png" width="200">': Country_Stats_ITN,
    '<i class="fas fa-globe-asia fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 国名表示モード': offstats,
    '<i class="fa fa-clock fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> タイムゾーン表示モード': Timezones_Layer,
    '<i class="fa fa-adjust fa-fw" style="color:black"></i><i class="fa fa-caret-right fa-fw" style="color:grey"></i> 昼夜境界線モード': day_night
};
const overlayMaps = {
    //'<i class="fa fa-circle fa-fw" style="color:lightgreen"></i>  My Project Profile': cluster_project,
};

//Control: Slide Menu
const slidemenutitle = '<h1 align="center">World Chroths Map</h1><p class="tipstyle03"align="center">Explore the world with colours.</p><hr color="white">';

let contents = '<p align="center" class="tipstyle02">情報元リストは下記を参照してください。<br>もしご意見等があれば下記へ連絡ください。</p><p align="center"><i class="fas fa-envelope fa-fw"></i>: e.horishita"at"gmail.com</p><hr color="white">';

contents += '<h3 align="center">グループ分類</h3><table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" width="120"> Group 6 :</td><td width="180">Highest - 16%</td></tr><tr><td align="right" width="120"> Group 5 :</td><td width="180">17% - 32%</td></tr><tr><td align="right" width="120"> Group 4 :</td><td width="180">33% - 49%</td></tr><tr><td align="right" width="120"> Group 3 :</td><td width="180">50% - 66%</td></tr><tr><td align="right" width="120"> Group 2 :</td><td width="180">67% - 82%</td></tr><tr><td align="right" width="120"> Group 1 :</td><td width="180">83% - Lowest</td></tr></table>';

contents += '<h3 align="center">参照情報リスト</h3>';

//index01
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">人口・人口密度 </td></tr><tr><td align="right" valign="top">説明 : </td><td>2017年人口 (単位: 百万人)<br>2017年人口密度 (単位: 陸地面積1平方kmあたりの人口)</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="https://data.worldbank.org/indicator/" target="_blank">World Bank Group Indicator</a></td></tr></table><hr>';
//index02
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220px">1人あたり国民所得（購買力平価）GNI PPP (Purchasing Power Parity) per capita</td></tr><tr><td align="right" valign="top">説明 : </td><td>Gross national income per capita 2017, PPP(Purchasing Power Parity) <br>(unit: International dollars)</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="https://data.worldbank.org/data-catalog" target="_blank">World Bank Data Catalog</a></td></tr></table><hr>';
//index03
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">国連人間開発指数</td></tr><tr><td align="right" valign="top">説明 : </td><td>2017年 UNDP 人間開発指数</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="http://hdr.undp.org/en/indicators/" target="_blank">UNDP Human Development Index</a></td></tr></table><hr>';
//index04
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">教育水準指数</td></tr><tr><td align="right" valign="top">説明 : </td><td>2015年 UNDP 人間開発指数:教育指数</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="http://hdr.undp.org/en/indicators/" target="_blank">UNDP Human Development Index</a></td></tr></table><hr>';
//index05
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">ジェンダー平等指数</td></tr><tr><td align="right" valign="top">説明 : </td><td>世界経済フォーラム/2017年ジェンダーギャップレポート</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="https://www.weforum.org/reports/the-global-gender-gap-report-2017" target="_blank">The Global Gendar Gap Report 2017</a></td></tr></table><hr>';
//index06
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">幸福度指数</td></tr><tr><td align="right" valign="top">説明 : </td><td>2018年世界幸福度報告書　(著者: John F. Helliwell, Richard Layard, and Jeffrey D. Sachs Associate Editors: Jan-Emmanuel De Neve, Haifang Huang and Shun Wang)</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="https://s3.amazonaws.com/happiness-report/2018/WHR_web.pdf" target="_blank">World Happiness Report 2018</a></td></tr></table><hr>';
//index07
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">健康寿命年齢</td></tr><tr><td align="right" valign="top">説明 : </td><td>世界保健機関(WHO), 2015年 Healthy Life Expectancy (HALE) at birth (years)</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="http://apps.who.int/gho/data/" target="_blank">Global Health Observatory data repository</a></td></tr></table><hr>';
//index08
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">環境負荷指数</td></tr><tr><td align="right" valign="top">説明 : </td><td>Global Footprint Network, 2014年エコロジカル・フットプリント <br>(単位: 地球 ... もしその国の平均的な生活レベルを地球上の全ての人が享受した場合、何個分の地球が必要となるか。)</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="http://data.footprintnetwork.org/#/compareCountries?type=earth&cn=all&yr=2014" target="_blank">Global Footprint Network: Compare Countries</a></td></tr></table><hr>';
//index09
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">災害リスク指数</td></tr><tr><td align="right" valign="top">説明 : </td><td>国連大学, 2017年 World Risk Report</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="https://ehs.unu.edu/blog/articles/world-risk-report-2016-the-importance-of-infrastructure.html" target="_blank">World Risk Report 2017</a></td></tr></table><hr>';
//index10
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">平和リスク指数</td></tr><tr><td align="right" valign="top">説明 : </td><td>Vision of Humanity, 2017年 Global Peace Index</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="http://visionofhumanity.org/indexes/global-peace-index/" target="_blank">Global Peace Index</a></td></tr></table><hr>';
//index11
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">報道の自由度</td></tr><tr><td align="right" valign="top">説明 : </td><td>国境なき記者団, 2018年 報道の自由度</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="https://rsf.org/en/ranking_table" target="_blank">Press Freedom Index</a></td></tr></table><hr>';
//index12
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">ICT開発指数</td></tr><tr><td align="right" valign="top">説明 : </td><td>国連 International Telecommunication Union 2017</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="http://www.itu.int/net4/ITU-D/idi/2017/index.html" target="_blank">ITU ICT Development Index</a></td></tr></table><hr>';
//index13
contents += '<table border="0" bordercolor="#999" cellpadding="5" cellspacing="0"><tr><td align="right" valign="top" width="80">指標 : </td><td width="220">インターネット浸透率</td></tr><tr><td align="right" valign="top">説明 : </td><td>CIA World Factbookの情報に基づき、各国のインターネット利用者数（2016年時点）／総人口（2018年時点）の比率から算出</td></tr><tr><td align="right" valign="top">情報元 : </td><td><a href="https://www.cia.gov/library/publications/the-world-factbook/rankorder/2153rank.html" target="_blank">CIA World Factbook</a></td></tr></table><hr>';

contents += '<p align="center" class="tipstyle02">更新日: January 2019</p>';

//Control: Others
if (L.Browser.mobile) {
    L.control.layers(baseMaps, overlayMaps,{collapsed:true}).addTo(map)}
else{
    L.control.layers(baseMaps, overlayMaps,{collapsed:false}).addTo(map);
}

L.Control.zoomHome().addTo(map);
L.control.scale({maxWidth:150, metric:true, imperial:false, position:'bottomleft'}).addTo(map);
L.control.polylineMeasure({position:'topleft', unit:'metre', showMeasurementsClearControl: true, showUnitControl: false, measureControlLabel: 'km', measureControlTitleOn: 'Measure Tool', measureControlTitleOff: 'Turn off Measure Tool'}).addTo(map);
L.control.slideMenu(slidemenutitle + contents, {width: '280px'}).addTo(map);
L.easyButton('<strong>EN</strong>', function(){ location.href = "https://co-place.com/chroths/en/"; }).addTo(map);
