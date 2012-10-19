class TrianglesController < ApplicationController
  # GET /triangles
  # GET /triangles.json
  def index
    @triangles = Triangle.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @triangles }
    end
  end

  # GET /triangles/1
  # GET /triangles/1.json
  def show
    @triangle = Triangle.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @triangle }
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
        format.html { redirect_to @triangle, notice: 'Triangle was successfully created.' }
        format.json { render json: @triangle, status: :created, location: @triangle }
      else
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
