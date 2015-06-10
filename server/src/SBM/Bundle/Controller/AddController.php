<?php

namespace SBM\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use SBM\Bundle\Entity\User;

class AddController extends Controller {
	public function indexAction(Request $request) {
			return new Response ( '<html><body>hello</body></html>' );
	}
	public function createAction() {
		$user = new User ();
		$user->setLogin ( 'beltram2' );
		$user->setPassword ( '123456789' );
		
		$em = $this->getDoctrine ()->getManager ();
		$em->persist ( $user );
		$em->flush ();
		
		return new Response ( 'Id du produit créé : ' . $user->getId () );
	}

}
