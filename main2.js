function create(dir) {
	
	document.write(`
	
	<div class="mt-5">
	<div class="row justify-content-center border-top border-dark pt-3 mr-1">
	<div class="col-6 text-center mt-3 mb-3 border-right border-dark"><a href="#" class="link">FAQ</a></div>
	<div class="col-6 text-center mt-3 mb-3"><a href="#" class="link">Newsletter</a></div>
	</div>
	<div class="row justify-content-center mr-1">
	<div class="col-6 text-center mt-3 mb-3 border-right border-dark"><a href="#" class="link">Github</a>
	</div>
	<div class="col-6 text-center mt-3 mb-3"><a href="#" class="link">Contact</a></div>
	</div>
	<br>
	</div>
	</div>
	
	<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
	integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
	crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
	integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
	crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
	integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
	crossorigin="anonymous"></script>
	<script src="${dir}highlight.pack.js"></script>
	<script>hljs.initHighlightingOnLoad();</script>
    <script src="${dir}script.js"></script>
	`);
}