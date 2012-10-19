class TrianglesController < ApplicationController
  # GET /triangles
  # GET /triangles.json
  def index
    @triangles = Triangle.all
    if params[:triangle].present?
      @triangle = Triangle.find(params[:triangle][:id])
    end
    @stage = params[:stage]
    respond_to do |format|
      format.js {render :template => 'triangles/index', :format => [:js]}
      format.html # index.html.erb
      format.json { render json: @triangles }
    end
  end

  def results
    @triangle = Triangle.find(params[:triangle][:id])
    if params.has_key?(:yes)
      @triangle.answer = true
    else 
      @triangle.answer = false
    end
    @triangle.save
    @alltriangles = Triangle.all
    respond_to do |format|
      format.js {render :template => 'triangles/results', :format => [:js]}
    end
  end    

  # GET /triangles/1
  # GET /triangles/1.json
  def show
    #@triangle = Triangle.find(params[:id])
    @triangle = Triangle.find(params[:id])
    @stage = @triangle.stage
    @alltriangles = Triangle.all
    if params.has_key?(:second)
      @othertriangle = Triangle.find(params[:second])
    end
    respond_to do |format|
      format.js {render :template => 'triangles/stage2', :format => [:js]}
      end
  end

  # GET /triangles/new
  # GET /triangles/new.json
  def new
    @triangle = Triangle.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @triangle }
    end
  end

  # GET /triangles/1/edit
  def edit
    @triangle = Triangle.find(params[:id])
  end

  # POST /triangles
  # POST /triangles.json
  def create
    @triangle = Triangle.new(params[:triangle])
    respond_to do |format|
      if @triangle.save
        @alltriangles = Triangle.all
         format.js {render :template => 'triangles/stage2', :format => [:js]}
#        format.html { redirect_to @triangle, notice: 'Triangle was successfully created.' }
#        format.json { render json: @triangle, status: :created, location: @triangle }
      else
        format.js {render :template => 'triangles/index', :format => [:js]}
        format.html # index.html.erb
        format.html { render action: "new" }
        format.json { render json: @triangle.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /triangles/1
  # PUT /triangles/1.json
  def update
    @triangle = Triangle.find(params[:id])

    respond_to do |format|
      if @triangle.update_attributes(params[:triangle])
        format.html { redirect_to @triangle, notice: 'Triangle was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @triangle.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /triangles/1
  # DELETE /triangles/1.json
  def destroy
    @triangle = Triangle.find(params[:id])
    @triangle.destroy

    respond_to do |format|
      format.html { redirect_to triangles_url }
      format.json { head :no_content }
    end
  end
end
