<?php

namespace SBM\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller {

	public function indexAction($name) {
		return $this->render('SBMBundle:Default:index.html.twig', array('name' => $name));
	}
}
