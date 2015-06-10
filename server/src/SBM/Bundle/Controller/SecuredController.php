<?php

namespace SBM\Bundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use SBM\Bundle\Entity\user;
use SBM\Bundle\Form\Type\RegistrationType;
use SBM\Bundle\Form\Model\Registration;


class SecuredController extends Controller
{

    public function loginAction(Request $request)
    {
    	$request = $this->getRequest();
    	$session = $request->getSession();
    	// get the login error if there is one
    	if ($request->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
    		$error = $request->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
    	} else {
    		$error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
    		$session->remove(SecurityContext::AUTHENTICATION_ERROR);
    	}
    	return $this->render('SBMBundle:Secured:login.html.twig', array(
    	// last username entered by the user
    			'last_username' => $session->get(SecurityContext::LAST_USERNAME),
    			'error' => $error,
    	));
    }

    public function createUserAction($login,$password) {
    
    	$factory = $this->get('security.encoder_factory');
    
    	$user = new User();
    
    	$encoder = $factory->getEncoder($user);
    	$user->setSalt(md5(time()));
    	$user->setLogin ($login);
    	$pass = $encoder->encodePassword($password, $user->getSalt());
    	$user->setPassword($pass);
    	$user->setIsActive(1); //enable or disable
    
    	$em = $this->getDoctrine()->getEntityManager();
    	$em->persist($user);
    	$em->flush();
    
    	return new Response('Sucessful');
    }
    
    public function createAction()
    {
    	$em = $this->getDoctrine()->getManager();
    
    	$form = $this->createForm(new RegistrationType(), new Registration());
    
    	$form->handleRequest($this->getRequest());
    
    	if ($form->isValid()) {
    		$registration = $form->getData();
    		$user = $registration->getUser();
    		$user->setIsActive(1);
    		$user->setSalt(md5(time()));
    
    		$em->persist($user);
    		$em->flush();
    		return new Response('Sucessful');
    		//return $this->forward('SBMBundle:Default:index',array("name" => "beltram"));
    	}
    	return new Response('Failed !');
    
    	//return $this->render('AcmeAccountBundle:Account:register.html.twig', array('form' => $form->createView()));
    }
}
