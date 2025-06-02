<?php

$i++;

$cfg['Servers'][$i]['verbose']         = 'b2b-product-service';

$cfg['Servers'][$i]['host']            = 'b2b-product-service-db';

$cfg['Servers'][$i]['port']            = '';

$cfg['Servers'][$i]['socket']          = '';

$cfg['Servers'][$i]['connect_type']    = 'tcp';

$cfg['Servers'][$i]['extension']       = 'mysqli';

$cfg['Servers'][$i]['auth_type']       = 'config';

$cfg['Servers'][$i]['user']            = 'root';

$cfg['Servers'][$i]['password']        = 'password';

$cfg['Servers'][$i]['AllowNoPassword'] = false;

$cfg['Servers'][$i]['auth_type']       = 'cookie';

$i++;


$cfg['Servers'][$i]['verbose']         = 'b2b-user-service';

$cfg['Servers'][$i]['host']            = 'b2b-user-service-db';

$cfg['Servers'][$i]['port']            = '';

$cfg['Servers'][$i]['socket']          = '';

$cfg['Servers'][$i]['connect_type']    = 'tcp';

$cfg['Servers'][$i]['extension']       = 'mysqli';

$cfg['Servers'][$i]['auth_type']       = 'config';

$cfg['Servers'][$i]['user']            = 'root';

$cfg['Servers'][$i]['password']        = 'password';

$cfg['Servers'][$i]['AllowNoPassword'] = false;

$cfg['Servers'][$i]['auth_type']       = 'cookie';

$i++;

?>