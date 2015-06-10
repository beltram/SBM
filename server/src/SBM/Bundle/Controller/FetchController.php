<?php

namespace SBM\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use SBM\Bundle\Entity\user;
use SBM\Bundle\Entity\visited;
use SBM\Bundle\Entity\links;
use Symfony\Component\Validator\Constraints\DateTime;

class FetchController extends Controller {
	public function indexAction(Request $request, $type) {
		$params = $this->getRequest ()->request->all ();
		if ($type == "all") {
			// print_r($params["itemList"]);
			//$this->insert ( $params );
			return new Response ( '<html><body>fetch all</body></html>' );
		} else if ($type == "single") {
			return new Response ( '<html><body></body></html>' );
		}
	}
	public function insert(Array $params) {
		$user = new User ();
		$user->setLogin ( 'beltram234' );
		$user->setPassword ( '123456789' );
		// $user->setIsFriendOf($params);
		
		$visited = new visited ();
		$visited->setFkUser ($user);
		$visited->setIpAddr ( "192.168.0.1" );
		// $visited->setFkLinks();
		// $visited->setTimestamp();
		
		$em = $this->getDoctrine ()->getManager ();
		$em->persist ( $user );
		$em->persist ( $visited );
		$em->flush ();
		
		print_r ( 'Id du produit cree : ' . $user->getId () );
	}
}
